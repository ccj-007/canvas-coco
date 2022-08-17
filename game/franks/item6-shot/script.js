const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCtx.width = window.innerWidth
collisionCtx.height = window.innerHeight

let ravens = []
ctx.font = '50px Impact'

let score = 0

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

class Raven {
  constructor() {
    //定义乌鸦的尺寸以及位置
    this.spriteWidth = 271
    this.spriteHeight = 194

    this.sizeModifier = Math.random() * .6 - .4
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3  // [3, 8) 
    this.directionY = Math.random() * 5 - 2.5
    //图
    this.image = new Image()
    this.image.src = '../static/collision/raven.png'

    this.markedForDeletion = false
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
    this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
    this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')'
  }
  update (deltatime) {
    if (this.y < 0 || this.y > canvas.height - this.height) {
      this.directionY = this.directionY * -1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < 0 - this.width) this.markedForDeletion = true

    this.timeSinceFlap += deltatime

    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
    }
  }
  draw () {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)

    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

function drawScore () {
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('Score: ' + score, 55, 80)
}

window.addEventListener('click', function (e) {
  const pixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)
  console.log(pixelColor);
})

//通过帧的控制
function animate (timestamp) {
  collisionCtx.clearRect(0, 0, collisionCtx.width, collisionCtx.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  let deltatime = timestamp - lastTime
  lastTime = timestamp
  timeToNextRaven += deltatime
  //获取每次绘制乌鸦的需要的帧，超过500ms，开始绘制下一个乌鸦
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven())
    timeToNextRaven = 0
    ravens.sort(function (x, y) {
      return x.width - y.width
    })
  }
  drawScore();
  //这里的扩展运算符可以更直观序列化的展示所有要绘制的内容
  [...ravens].forEach(object => object.update(deltatime));
  [...ravens].forEach(object => object.draw());

  ravens = ravens.filter(object => !object.markedForDeletion)
  requestAnimationFrame(animate)
}

animate(0)