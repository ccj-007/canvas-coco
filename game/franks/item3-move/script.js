/**  */
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500

let numsEnemys = 240
let enemyList = []
let gameFrame = 0  //外部控制通过取余多久新增一次

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = '../static/enemy/enemy_bat_1.png'

    // this.speed = Math.random() * 4 - 2  //处理方向
    this.speed = Math.random() * 4 + 1 //处理方向

    this.spriteWidth = 83
    this.spriteHeight = 44

    /** 处理画布的拉伸缩放 */
    this.width = this.spriteWidth / 1
    this.height = this.spriteHeight / 1

    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)

    this.frame = 0
    this.flapSpeed = Math.floor(Math.random() * 3 + 1) //范围1到4 

    //如果做一个正弦的弹跳移动
    this.angle = 0
    // this.angleSpeed = Math.random() * 0.2
    // this.curve = Math.random() * 7

    //特殊移动
    this.angleSpeed = Math.random() * 2 + 0.5
    this.curve = Math.random() * 200 + 40
  }
  update () {
    // this.x -= this.speed
    // this.y += this.curve * Math.sin(this.angle)

    //特殊移动
    this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 180) + (canvas.width / 2 - this.width / 2)
    this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 90) + (canvas.height / 2 - this.height / 2)

    this.angle += this.angleSpeed
    if (this.x + this.width < 0) this.x = CANVAS_WIDTH

    //控制动画循环
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++
    }
  }
  draw () {
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

for (let index = 0; index < numsEnemys; index++) {
  enemyList.push(new Enemy())
}

let enemy = new Enemy()
function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  enemyList.forEach(enemy => {
    enemy.update()
    enemy.draw()
  })

  gameFrame++

  requestAnimationFrame(animate)
}

animate()

