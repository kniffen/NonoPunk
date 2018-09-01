import { Container } from 'pixi.js'

import page             from './page'
import drawClues        from './draw-clues'
import drawGrid         from './draw-grid'
import drawGridDeviders from './draw-grid-deviders'
import drawNotification from './draw-notification'
import drawTitleScreen  from './draw-title-screen'

const levels = [
  [
    [1,1,1,1,1]
  ],
  [
    [0,1,1,1,1]
  ],
  [
    [1,1,0,1,1]
  ],
  [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],
]

export default function drawTutorial(app, state) {

  app.stage.removeChildren()

  const wrapper = page({
    width:  app.view.width,
    height: app.view.height,
    name: 'tutorial',
    buttons: ['next', 'back']
  })
  app.stage.addChild(wrapper)
  
  let level = 0

  state.solution = levels[level]
  state.grid = levels[level].map(row => row.map(() => 0))

  const board = new Container()

  const adjustBoard = () => {
    board.height = ~~(wrapper.height * (state.grid.length > 3 ? 0.5 : 0.2))
    board.width  = board._height / state.grid.length * state.grid[0].length
    board.x = app.view.width  / 2 - board._width  / 2
    board.y = app.view.height / 2 - board._height / 2
  }
  adjustBoard()

  wrapper.addChild(board)

  drawNotification(app, 'Left click on tiles to fill them')
  drawClues(board, state)
  drawGrid(board, state)
  drawGridDeviders(board, state)

  wrapper.getChildByName('btn-next').visible = false

  wrapper.getChildByName('btn-next').on('click', () => {
    
    wrapper.getChildByName('btn-next').visible = false

    board.removeChildren()

    if (level == 3) {
      state.grid = null
      state.solution = null
      drawTitleScreen(app, state)
      return
    }

    level++

    state.solution = levels[level]
    state.grid = levels[level].map(row => row.map(() => 0))

    adjustBoard()

    drawClues(board, state)
    drawGrid(board, state)
    drawGridDeviders(board, state)

    if (level == 1) {
      drawNotification(app, 'The numbers tell how many tiles are filled in a row/column')
    } else if (level == 2) {
      drawNotification(app, 'Sometimes there\'s a space between a row of numbers')
    } else if (level == 3) {
      drawNotification(app, 'You can right click to indicate empty tiles')
    }

  })

  wrapper.getChildByName('btn-back').on('click', () => {
    state.grid = null
    state.solution = null
    drawTitleScreen(app, state)
  })

}