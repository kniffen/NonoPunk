import { Application, Container } from 'pixi.js'

import levels           from '../levels.json'
import sounds           from './sounds'
import drawLevels       from './draw-levels'
import drawGame         from './draw-game'
import drawOptions      from './draw-options'
import drawTitleScreen  from './draw-title-screen'
import drawNotification from './draw-notification'

const height = window.innerHeight > 720 ? window.innerHeight : 750
const width  = height / 9 * 16

const app = new Application({width, height, backgroundColor: 0x090A0C, autoResize: true})

document.body.appendChild(app.view)

// Initial state
const state = {
  currentValue: -1,
  grid: null,
  solution: null
}

state.currentLevel    = parseInt(localStorage.currentLevel)    || 0
state.currentProgress = parseInt(localStorage.currentProgress) || 0
state.colorHue        = parseInt(localStorage.colorHue)        || 0

const colorMatrix = new PIXI.filters.ColorMatrixFilter()
app.stage.filters = [colorMatrix]
app.stage.filters[0].hue(state.colorHue)

sounds.music.forEach(sound => sound.volume = parseFloat(localStorage.musicVolume) || 0.1)
sounds.sfx.forEach(sound   => sound.volume = parseFloat(localStorage.sfxVolume)   || 0.5)

if (sounds.music[0].volume > 0.01) sounds.music[0].play()

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
    
    if (app.stage.getChildByName('game') ) {
      app.stage.getChildByName('game').getChildByName('btn-next').visible = true
    }
    
    if (app.stage.getChildByName('tutorial') ) {
      app.stage.getChildByName('tutorial').getChildByName('btn-next').visible = true
    }

    drawNotification(app, 'solved')

  }
})

window.addEventListener('resize', () => {
  const height = window.innerHeight > 720 ? window.innerHeight : 750
  const width  = height / 9 * 16

  app.renderer.resize(width, height)

  switch (app.stage.children[0].name) {
    case 'levels':
      drawLevels(app, state)
      break
    case 'game':
      drawGame(app, state)
      break
    case 'options':
      drawOptions(app, state)
      break
    default:
      drawTitleScreen(app, state)
      break
  }
})