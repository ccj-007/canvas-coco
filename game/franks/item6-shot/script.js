const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const collisionCanvas = document.getElementById('collisionCanvas')
const collisionCtx = collisionCanvas.getContext('2d')
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

console.log(window.innerWidth);
let ravens = []
ctx.font = '50px Impact'

let score = 0
let gameOver = false

let timeToNextRaven = 0
let ravenInterval = 500
let lastTime = 0

let trailings = []
class Trailing {
  constructor(x, y, size, color) {
    this.color = color
    this.size = size
    this.x = x + this.size / 2 + Math.random() * 10 - 5
    this.y = y + this.size / 3 + Math.random() * 10 - 5
    this.radius = Math.random() * this.size / 10 + 2
    this.maxRadius = Math.random() * 20 + 35
    this.markedForDeletion = false
    this.speedX = Math.random() * 1 + 0.5
    this.color = color
  }
  //执行动作
  update () {
    this.x += this.speedX
    this.radius += 0.8
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true
  }
  draw () {
    ctx.save()
    ctx.globalAlpha = 1 - this.radius / this.maxRadius
    ctx.beginPath();
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

class Raven {
  constructor() {
    //定义乌鸦的尺寸以及位置
    this.spriteWidth = 271
    this.spriteHeight = 194

    this.sizeModifier = Math.random() * .6 + .4
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

    this.hasTrail = Math.random() > .2
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

      //放入拖尾效果
      if (this.hasTrail) {
        for (let i = 0; i < 3; i++) {
          trailings.push(new Trailing(this.x, this.y, this.width, this.color))
        }
      }
    }

    if (this.x < 0 - this.width) gameOver = true
  }
  draw () {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)

    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

//爆炸动画
let explosions = []
class Explosion {
  constructor(x, y, size) {
    this.image = new Image()
    this.image.src = '../static/collision/cloud.png'
    this.x = x
    this.y = y
    this.size = size
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.frame = 0
    this.sound = new Audio
    this.sound.src = '../static/chew.wav'
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.markedForDeletion = false
  }
  update (deltatime) {
    if (this.frame === 0) this.sound.play()
    this.timeSinceLastFrame += deltatime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++

      if (this.frame > 5) {
        this.markedForDeletion = false
      }
    }
  }
  draw () {
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteWidth, this.x, this.y, this.size, this.size)
  }
}



function drawScore () {
  ctx.fillStyle = 'black'
  ctx.fillText('Score: ' + score, 50, 75)
  ctx.fillStyle = 'white'
  ctx.fillText('Score: ' + score, 55, 80)
}
function drawGameOver () {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2)
  ctx.fillStyle = 'white'
  ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2 + 5, canvas.height / 2 + 5)
}

window.addEventListener('click', function (e) {
  const pixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1)

  let pc = pixelColor.data

  console.log(pc);
  ravens.forEach(object => {
    if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
      object.markedForDeletion = true
      score++
      explosions.push(new Explosion(object.x, object.y, object.width))
    }
  })
})

//通过帧的控制  
function animate (timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height)

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
  [...trailings, ...ravens, ...explosions].forEach(object => object.update(deltatime));
  [...trailings, ...ravens, ...explosions].forEach(object => object.draw());

  ravens = ravens.filter(object => !object.markedForDeletion)

  explosions = explosions.filter(object => !object.markedForDeletion)
  trailings = trailings.filter(object => !object.markedForDeletion)

  //游戏结束就取消
  if (!gameOver) requestAnimationFrame(animate)
  else drawGameOver()
}

animate(0)