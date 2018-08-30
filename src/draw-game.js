import { Container, Text } from 'pixi.js'

import levels from '../levels'
import button           from './button'
import drawTitleScreen  from './draw-title-screen'
import drawGrid         from './draw-grid'
import drawGridDeviders from './draw-grid-deviders'
import drawClues        from './draw-clues'
import drawLevels       from './draw-levels'

export default function drawGame(app, state, sounds) {

  app.stage.removeChildren()

  const title   = new Text(`LEVEL ${state.currentLevel + 1}`, { fontFamily : 'Roboto', fontWeight: '400', fill: 0x23C1B2 })
  const board   = new Container()

  title.x = 20
  title.y = 20

  board.height = app.view.height * 0.9
  board.width  = board._height / state.grid.length * state.grid[0].length
  board.x = app.view.width  / 2 - board._width  / 2
  board.y = app.view.height / 2 - board._height / 2

  app.stage.addChild(title, board)

  const buttons = ['quit', 'back', 'reset', 'next']
  buttons.forEach((name, i) => {

    const width = app.view.width * 0.11
    const height = width / 394 * 84
    const x = app.view.width - width - 20
    const y = app.view.height - (i * height + i * 20) - height - 20
    const btn = button({wide: true, name, width, height, x, y})

    if (name == 'next') {
      btn.visible = false
    }

    btn.on('click', () => {
      sounds.sfx[0].play()

      switch (name) {
        case 'next':
          state.currentLevel++
          state.solution = levels[state.currentLevel]
          state.grid = levels[state.currentLevel].map(row => row.map(() => 0))
          localStorage.state = JSON.stringify(state)
          drawGame(app, state, sounds)
          break
        
        case 'reset':
          state.grid = state.grid.map(row => row.map(() => 0))
          localStorage.state = JSON.stringify(state)
          drawGame(app, state, sounds)
          break
        
        case 'back':
          drawLevels(app, state, sounds)
          break

        case 'quit':
          drawTitleScreen(app, state, sounds)
          break
      }
    })

    app.stage.addChild(btn)

  })

  drawClues(board, state)
  drawGrid(board, state, sounds)
  drawGridDeviders(board, state)

}