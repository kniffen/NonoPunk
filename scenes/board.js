import state from '../state.js'
import * as stage from '../stage.js'
import * as scenes from './scenes.js'
import { resolution } from '../graphics.js'
import * as components from '../components/components.js'
import levels from '../levels.js'
import { sounds } from '../assets.js'

export function create(levelId) {
  const level = levels[levelId]
  const boardScene = components.scene.create()
  
  // Container
  const gridContainerSize = resolution.height - 60
  const cellSize = gridContainerSize / 1.5 / level.size
  const boardContainer = components.container.create({
    x: resolution.width  / 2 - gridContainerSize / 2,
    y: resolution.height / 2 - gridContainerSize / 2,
    width:  gridContainerSize,
    height: gridContainerSize,
  })

  // Background
  boardContainer.addChildren([
    components.gradient.create({
      x: boardContainer.width / 3,
      width:  boardContainer.width / 1.5,
      height: boardContainer.height,
      colors: ['#090A0C', '#28635C', '#28635C', '#28635C'],
      isFlipped: true,
    }),
    components.gradient.create({
      y: boardContainer.height / 3,
      width:  boardContainer.width,
      height: boardContainer.height / 1.5,
      colors: ['#090A0C', '#28635C', '#28635C', '#28635C'],
    })
  ])

  // Highlights
  const columnHighlight = components.gradient.create({
    x: boardContainer.width / 3,
    width:  cellSize,
    height: boardContainer.height / 3,
    globalAlpha: 0.25,
    colors: ['#090A0C', '#23C1B2'],
    isFlipped: true,
  })

  const rowHighlight = components.gradient.create({
    y: boardContainer.height / 3,
    width:  boardContainer.width / 3,
    height: cellSize,
    globalAlpha: 0.25,
    colors: ['#090A0C', '#23C1B2'],
  })

  const cellHighlight = components.rect.create({
    x: boardContainer.width / 3,
    y: boardContainer.height / 3,
    stroke: 2,
    strokeColor: '#23C1B2',
    width: cellSize,
    height: cellSize,
  })

  boardContainer.addChildren([columnHighlight, rowHighlight, cellHighlight])

  // Clues
  const textSize = cellSize * 0.5
  for (let x = 0; x < level.size; x++) {
    let rows = []
    for (let y = 0; y < level.size; y++) {
      rows.push(level.solution[x + y * level.size])
    }
    rows = rows.join('').match(/1+/g)
    if (rows) rows.reverse()
    const counts = rows ? rows.map(str => str.length) : [0]

    for (let i = 0; i < counts.length; i++) {
      boardContainer.addChild(components.text.create({
        x: boardContainer.width / 3 + cellSize * x + cellSize * 0.25,
        y: boardContainer.height / 3 - textSize - cellSize * i - cellSize * 0.25,
        size: cellSize * 0.5,
        value: counts[i] < 10 ? ' ' + counts[i].toString() : counts[i].toString(),
        color: state.color,
      }))
    }
  }

  for (let x = 0; x < level.solution.length; x += level.size) {
    const columns = level.solution.slice(x, x + level.size).join('').match(/1+/g)
    const counts  = columns ? columns.map(str => str.length).reverse() : [0]
    const textSize = cellSize * 0.5

    for (let i = 0; i < counts.length; i++) {
      boardContainer.addChild(components.text.create({
        x: boardContainer.width / 3 - textSize - cellSize * i - cellSize * 0.25,
        y: boardContainer.height / 3 + cellSize / level.size * x + cellSize * 0.25,
        size: textSize,
        value: counts[i] < 10 ? ' ' + counts[i].toString() : counts[i].toString(),
        color: state.color,
      }))
    }
  }

  // Cells
  const cells = components.cells.create({
    x: boardContainer.width  / 3,
    y: boardContainer.height / 3,
    width: boardContainer.width   / 1.5,
    height: boardContainer.height / 1.5,
    grid: level.solution.map(() => 0),
  })

  let activeCellValue = -1
  cells.on('mousemove', function(mouse) {
    const column = Math.floor(mouse.x / cellSize)
    const row    = Math.floor(mouse.y / cellSize)
    const index  = column + row * level.size
  
    columnHighlight.x = boardContainer.width  / 3 + cellSize * column
    rowHighlight.y    = boardContainer.height / 3 + cellSize * row

    cellHighlight.x = boardContainer.width  / 3 + cellSize * column
    cellHighlight.y = boardContainer.height / 3 + cellSize * row

    if (activeCellValue >= 0 && activeCellValue !== cells.grid[index]) {
      cells.grid[index] = activeCellValue

      const sound = sounds[1 === activeCellValue ? 'click' : 'clack']

      sound.currentTime = 0
      sound.play()
      checkState()
    }
  })

  function checkState() {
    let solved = true
    const grid = cells.grid.map(val => val === 2 ? 0 : val)

    for (let i = 0; i < level.solution.length; i++) {
      if (level.solution[i] !== grid[i]) {
        solved = false
        break
      }
    }

    if (solved) {
      continueBtn.x = resolution.width - 220
      solvedOverlay.x = resolution.width  / 2 - resolution.height * 0.2
      
      if(!state.solvedLevels.includes(levelId)) {
        state.solvedLevels.push(levelId)
        state.save()
      }
    }
  }

  cells.on('mousedown', function(mouse) {
    const index = Math.floor(mouse.x / cellSize) + Math.floor(mouse.y / cellSize) * level.size
    
    if (1 !== cells.grid[index] && 0 === mouse.button) {
      activeCellValue = 1
    } else if (2 !== cells.grid[index] && 2 === mouse.button) {
      activeCellValue = 2
    } else {
      activeCellValue = 0
    }
  })

  cells.on('mouseup', function(mouse) {
    activeCellValue = -1
  })

  boardContainer.addChild(cells)

  // Dividers
  for (let i = 0; i <= level.size; i++) {
    boardContainer.addChildren([
      components.gradient.create({
        x: boardContainer.width / 3 + cellSize * i,
        y: 2,
        width:  0 === i % 5 ? 2 : 1,
        height: boardContainer.height,
        colors: ['#090A0C', '#23C1B2', '#23C1B2', '#23C1B2'],
        isFlipped: true,
      }),
      components.gradient.create({
        x: 2,
        y: boardContainer.height / 3 + cellSize * i,
        width: boardContainer.width,
        height:  0 === i % 5 ? 2 : 1,
        colors: ['#090A0C', '#23C1B2', '#23C1B2', '#23C1B2'],
      })
    ])
  }

  // UI
  const title = components.text.create({
    x: 20,
    y: 50,
    size: 30,
    value: `LEVEL ${level.id + 1}`,
    color: state.color,
  })

  const quitBtn = components.button.create({
    x: resolution.width - 220,
    y: resolution.height - 80,
    width: 200,
    text: 'Quit',
    color: state.color,
  })

  const backBtn = components.button.create({
    x: resolution.width - 220,
    y: quitBtn.y - 80,
    width: 200,
    text: 'Back',
    color: state.color,
  })

  const resetBtn = components.button.create({
    x: resolution.width - 220,
    y: backBtn.y - 80,
    width: 200,
    text: 'Reset',
    color: state.color,
  })

  const continueBtn = components.button.create({
    x: resolution.width + 2000,
    y: resetBtn.y - 80,
    width: 200,
    text: 'Continue',
    color: state.color,
  })

  quitBtn.on('mouseup', function() {
    stage.setScene(scenes.title.create())
  })

  backBtn.on('mouseup', function() {
    stage.setScene(scenes.levels.create())
  })

  resetBtn.on('mouseup', function() {
    cells.grid = level.solution.map(() => 0)
  })

  continueBtn.on('mouseup', function() {
    if (levelId < 89) {
      stage.setScene(scenes.board.create(levelId + 1))
    } else {
      stage.setScene(scenes.levels.create())
    }
  })

  boardScene.addChildren([boardContainer])
  boardScene.addChildren([title, quitBtn, backBtn, resetBtn, continueBtn])

  // Solved overlay
  const solvedOverlay = components.container.create({
    x: resolution.width + 2000,
    y: resolution.height / 2 - resolution.height * 0.1,
    width: resolution.height  * 0.4,
    height: resolution.height * 0.2,
  })
  solvedOverlay.addChildren([
    components.rect.create({
      x: 0,
      y: 0,
      width: solvedOverlay.width,
      height: solvedOverlay.height,
      stroke: 5,
      fill: '#28635C',
      strokeColor: '#23C1B2',
    }),
    components.text.create({
      x: solvedOverlay.width  / 2,
      y: solvedOverlay.height / 2 - 40,
      value: 'SOLVED',
      size: 60,
      align: 'center',
      color: '#23C1B2',
    })
  ])

  boardScene.addChild(solvedOverlay)

  return boardScene
}