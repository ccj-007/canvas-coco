const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 700

let gameSpeed = 5

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

let x = 0

function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.drawImage(backGroundLayer2, x, 0)
  x--
  requestAnimationFrame(animate)
}

animate()