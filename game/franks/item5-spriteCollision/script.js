const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500

const explosions = []
let canvasPosition = canvas.getBoundingClientRect()
class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.width = this.spriteWidth * .5
    this.height = this.spriteHeight * .5
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = '../static/collision/cloud.png'
    this.frame = 0
    this.timer = 0
    this.angle = Math.random() * 6.2

    this.sound = new Audio()
    this.sound.src = '../static/chew.ogg'
  }
  update () {
    if (this.frame === 0) this.sound.play()
    this.timer++
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }
  draw () {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * .5, 0 - this.height * .5, this.width, this.height)

    ctx.restore()
  }
}

function createAnimate (e) {
  let positionX = e.x - canvasPosition.left
  let positionY = e.y - canvasPosition.top
  // ctx.fillRect(  positionX,   positionY, 50, 50)
  explosions.push(new Explosion(positionX, positionY))
}

window.addEventListener('click', createAnimate)

// window.addEventListener('mousemove', createAnimate)




function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  for (let i = 0; i < explosions.length; i++) {
    const explosion = explosions[i];
    explosion.update()
    explosion.draw()

    if (explosion.frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  }
  requestAnimationFrame(animate)
}

animate()