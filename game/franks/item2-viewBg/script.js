const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 500

let gameSpeed = 10

const backGroundLayer1 = new Image()
backGroundLayer1.src = '../static/city_bg/layer-1.png'
const backGroundLayer2 = new Image()
backGroundLayer2.src = '../static/city_bg/layer-2.png'
const backGroundLayer3 = new Image()
backGroundLayer3.src = '../static/city_bg/layer-3.png'
const backGroundLayer4 = new Image()
backGroundLayer4.src = '../static/city_bg/layer-4.png'
const backGroundLayer5 = new Image()
backGroundLayer5.src = '../static/city_bg/layer-5.png'

//处理滑块速度
const slider = document.querySelector('.slider')
slider.value = gameSpeed
const showGameSpeed = document.getElementById('showGameSpeed')
showGameSpeed.innerHTML = gameSpeed

slider.addEventListener('change', function (e) {
  gameSpeed = e.target.value
  showGameSpeed.innerHTML = e.target.value
})

//有两种方案处理背景无缝移动，1. 通过2张图拼接  2.通过2张图回跳
class Layer {
  constructor(image, speedModifier) {
    this.x = 0
    this.y = 0
    this.width = 1667
    this.height = CANVAS_HEIGHT
    // this.x2 = this.width
    this.images = image
    this.speedModifier = speedModifier
    this.speed = gameSpeed * this.speedModifier
  }

  update () {
    this.speed = gameSpeed * this.speedModifier

    if (this.x <= -this.width) {
      this.x = 0
    }

    this.x -= this.speed
    //第一种2张图拼接
    // if (this.x <= -this.width) {
    //   this.x = this.width + this.x2 - this.speed
    // }
    // if (this.x2 <= -this.width) {
    //   this.x2 = this.width + this.x - this.speed
    // }

    // this.x = Math.floor(this.x - this.speed)
    // this.x2 = Math.floor(this.x2 - this.speed)
  }

  draw () {
    //第一种2张图拼接
    // ctx.drawImage(this.images, this.x, this.y, this.width, this.height)
    // ctx.drawImage(this.images, this.x2, this.y, this.width, this.height)
    ctx.drawImage(this.images, this.x, this.y, this.width, this.height)
    ctx.drawImage(this.images, this.x + this.width, this.y, this.width, this.height)
  }
}
const layer1 = new Layer(backGroundLayer1, 0.5)
const layer2 = new Layer(backGroundLayer2, 0.5)
const layer3 = new Layer(backGroundLayer3, 0.5)
const layer4 = new Layer(backGroundLayer4, 0.5)
const layer5 = new Layer(backGroundLayer5, 0.5)

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  gameObjects.forEach(object => {
    object.update()
    object.draw()
  })

  requestAnimationFrame(animate)
}

animate()