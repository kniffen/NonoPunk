import { Container, Text } from 'pixi.js'

import levels           from '../levels'
import page             from './page'
import drawLevels       from './draw-levels'
import drawTitleScreen  from './draw-title-screen'
import drawClues        from './draw-clues'
import drawGrid         from './draw-grid'
import drawGridDeviders from './draw-grid-deviders'

export default function drawGame(app, state, sounds) {

  app.stage.removeChildren()

  const wrapper = page({
    width: app.view.width,
    height: app.view.height,
    name: 'options',
    buttons: ['next', 'reset', 'back', 'quit']
  })
  const board   = new Container()

  board.height = app.view.height * 0.9
  board.width  = board._height / state.grid.length * state.grid[0].length
  board.x = app.view.width  / 2 - board._width  / 2
  board.y = app.view.height / 2 - board._height / 2

  wrapper.addChild(board)

  wrapper.getChildByName('btn-next').visible = false

  wrapper.getChildByName('btn-next').on('click', () => {
    sounds.sfx[0].play()
    state.currentLevel++
    state.solution = levels[state.currentLevel]
    state.grid = levels[state.currentLevel].map(row => row.map(() => 0))
    localStorage.state = JSON.stringify(state)
    drawGame(app, state, sounds)
  })

  wrapper.getChildByName('btn-reset').on('click', () => {
    sounds.sfx[0].play()
    state.grid = state.grid.map(row => row.map(() => 0))
    localStorage.state = JSON.stringify(state)
    drawGame(app, state, sounds)
  })

  wrapper.getChildByName('btn-back').on('click', () => {
    sounds.sfx[0].play()
    drawLevels(app, state, sounds)
  })

  wrapper.getChildByName('btn-quit').on('click', () => {
    sounds.sfx[0].play()
    drawTitleScreen(app, state, sounds)
  })

  app.stage.addChild(wrapper)

  drawClues(board, state)
  drawGrid(board, state, sounds)
  drawGridDeviders(board, state)
}