import { Graphics } from 'pixi.js'

export default function drawGrid(container, state, sounds) {

  const width  = container._width  / 1.5 / state.grid[0].length
  const height = container._height / 1.5 / state.grid.length

  for (const y in state.grid) {
    for (const x in state.grid[y]) {
      const cell = new Graphics()
      const posX   = container._width  / 3 + x * width
      const posY   = container._height / 3 + y * height

      cell.interactive = true

      cell.on('pointerdown', e => {
        if (e.data.button !== 0 && e.data.button !== 2) return

        if (e.data.button === 0 && state.grid[y][x] !== 1) {
          state.currentValue = 1
        } else if (e.data.button === 2 && state.grid[y][x] !== 2) {
          state.currentValue = 2
        } else {
          state.currentValue = 0
        }

        state.grid[y][x] = state.currentValue
        drawCell(cell, posX, posY, width, height, state.grid[y][x])
        state.currentValue === 1 ? sounds.sfx[0].play() : sounds.sfx[1].play()
      })

      cell.on('mouseover', e => {
        hightlight.x = posX + 0.5
        hightlight.y = posY + 0.5
        horizontalHightlight.y = posY
        verticalHightlight.x   = posX

        if (state.currentValue === -1 || state.currentValue == state.grid[y][x]) return

        state.grid[y][x] = state.currentValue
        drawCell(cell, posX, posY, width, height, state.grid[y][x])
        state.currentValue === 1 ? sounds.sfx[0].play() : sounds.sfx[1].play()
      })
      
      drawCell(cell, posX, posY, width, height, state.grid[y][x])

      container.addChild(cell)

    }
  }

  // Hightlights
  const hightlight = new Graphics()
  const horizontalHightlight = container.getChildByName('horizontal-highlight')
  const verticalHightlight   = container.getChildByName('vertical-highlight')

  hightlight.x = -5000
  hightlight.lineStyle(2, 0x23C1B2)
  hightlight.drawRect(0, 0, width, height)

  container.addChild(hightlight)

}

function drawCell(cell, x, y, width, height, value) {
  
  cell.clear()
  cell.removeChildren()
  cell.beginFill(0x28635C)
  cell.drawRect(x, y, width, height)
  cell.endFill()

  switch (value) {
    case 1:
      cell.beginFill(0x23C1B2)
      cell.drawRect(x + 3, y + 3, width - 5, height - 5)
      cell.endFill()
      break

    case 2:
      const cross = new Graphics()
      const margin = width * 0.2

      cross.lineStyle(width * 0.1, 0x23C1B2)
           .moveTo(x + margin, y + margin)
           .lineTo(x + width - margin, y + height - margin)
           .moveTo(x + width - margin, y + margin)
           .lineTo(x + margin, y + height - margin)

      cell.addChild(cross)
      break
  }

}