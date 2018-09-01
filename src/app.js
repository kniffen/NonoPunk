import { Application, Container } from 'pixi.js'

import levels           from '../levels.json'
import sounds           from './sounds'
import drawTitleScreen  from './draw-title-screen'
import drawNotification from './draw-notification'

const app = new Application({
  width: window.innerWidth,
  height: ~~(window.innerWidth / 16 * 9),
  backgroundColor: 0x090A0C,
  autoResize: true,
})

document.body.appendChild(app.view)

// Initial state
const state = {
  currentValue: -1,
  grid: null,
  solution: null
}

state.currentLevel    = parseInt(localStorage.currentLevel)    || 0
state.currentProgress = parseInt(localStorage.currentProgress) || 0

sounds.music.forEach(sound => sound.volume = parseFloat(localStorage.musicVolume) || 0.1)
sounds.sfx.forEach(sound   => sound.volume = parseFloat(localStorage.sfxVolume)   || 0.5)

if (sounds.music[0].volume > 0.01) sounds.music[0].play()

function resize() {
  let width, height

  if (window.innerWidth / 16 * 9 > window.innerHeight) {
    height = window.innerHeight
    width  = Math.floor((window.innerHeight / 9 * 16))
  } else {
    width  = window.innerWidth
    height = Math.floor((window.innerWidth / 16 * 9))
  }

  app.view.style.width  = width + 'px'
  app.view.style.height = height + 'px'
}

resize()
drawTitleScreen(app, state)

document.body.addEventListener('contextmenu', e => e.preventDefault())

window.addEventListener('mouseup', function() {
  state.currentValue = -1

  if (!state.grid && !state.solution) return

  let solved = true
  const grid = state.grid.map(row => row.map(val => val === 2 ? 0 : val))

  for (const y in grid) {
    for (const x in grid[y]) {
      if (grid[y][x] !== state.solution[y][x]) solved = false
    }
  }

  if (solved && state.currentLevel == state.currentProgress && state.currentProgress == levels.length - 1){
    drawNotification(app, 'Game over')
  } else if (solved) {
    if (state.currentLevel == state.currentProgress) {
      state.currentProgress++
      localStorage.currentProgress = state.currentProgress
    }
    app.stage.getChildByName('game').getChildByName('btn-next').visible = true
    drawNotification(app, 'solved')
  }
})

window.addEventListener('resize', () => resize())