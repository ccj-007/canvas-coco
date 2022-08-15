const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500

let ravens = []

class Raven {
  constructor() {
    //定义乌鸦的尺寸以及位置
    this.width = 100
    this.height = 50
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 5 + 3  // [3, 8) 
    this.directionY = Math.random() * 5 - 2.5
  }
  update () {
    this.x -= this.directionX
  }
  draw () {
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

function animate (timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  console.log("test");
  requestAnimationFrame(animate)
}

animate()