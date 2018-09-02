import { Container, Text } from 'pixi.js'

import levels           from '../levels'
import page             from './page'
import drawLevels       from './draw-levels'
import drawTitleScreen  from './draw-title-screen'
import drawClues        from './draw-clues'
import drawGrid         from './draw-grid'
import drawGridDeviders from './draw-grid-deviders'

export default function drawGame(app, state) {

  app.stage.removeChildren()

  const wrapper = page({
    width: app.view.width,
    height: app.view.height,
    name: 'game',
    buttons: ['next', 'reset', 'back', 'quit']
  })

  wrapper.getChildByName('page-title').text = 'LEVEL ' + (state.currentLevel + 1)

  const board   = new Container()
  board.height = app.view.height * 0.9
  board.width  = board._height / state.grid.length * state.grid[0].length
  board.x = app.view.width  / 2 - board._width  / 2
  board.y = app.view.height / 2 - board._height / 2

  wrapper.addChild(board)

  wrapper.getChildByName('btn-next').visible = false

  wrapper.getChildByName('btn-next').on('click', () => {
    state.currentLevel++
    state.solution = levels[state.currentLevel]
    state.grid     = levels[state.currentLevel].map(row => row.map(() => 0))
    
    localStorage.currentLevel = state.currentLevel
    
    drawGame(app, state)
  })

  wrapper.getChildByName('btn-reset').on('click', () => {
    state.grid = state.grid.map(row => row.map(() => 0))
    drawGame(app, state)
  })

  wrapper.getChildByName('btn-back').on('click', () => {
    drawLevels(app, state)
  })

  wrapper.getChildByName('btn-quit').on('click', () => {
    drawTitleScreen(app, state)
  })

  app.stage.addChild(wrapper)

  drawClues(board, state)
  drawGrid(board, state)
  drawGridDeviders(board, state)
}