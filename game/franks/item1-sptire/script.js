let playerState = 'bite'
const dropdown = document.getElementById('animations')
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value
})

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 600
const CANVAS_HEIGHT = canvas.height = 600

const playerImage = new Image()
playerImage.src = '../static/shadow_dog.png'
const spritWidth = 575
const spritHeight = 523

let gameFrame = 0
let staggerFrames = 3   //用于控制速率 

const spriteAnimations = []  //所有动作对应的动画合集
//定位所有精灵图的坐标状态
const animationStates = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'getHit',
    frames: 4
  },
]

animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  }
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spritWidth
    let positionY = index * spritHeight
    frames.loc.push({ x: positionX, y: positionY })
  }

  spriteAnimations[state.name] = frames
})

console.log("spriteAnimations", spriteAnimations);


function animate () {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  //sx sy sw sh 控制裁剪     dx, dy, dw, dh控制画布

  //这里做动画帧的循环，Math.floor(gameFrame / staggerFrames)代表我的帧的位置，  % 总帧数 用于循环
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length

  let frameX = position * spritWidth
  let frameY = spriteAnimations[playerState].loc[position].y
  ctx.drawImage(playerImage, frameX, frameY, spritWidth, spritHeight, 0, 0, spritWidth, spritHeight)

  gameFrame++
  requestAnimationFrame(animate)
}

animate()