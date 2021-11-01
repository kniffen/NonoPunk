/* Components: Cells */
import state from '../state.js'
import { ctx } from '../graphics.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const cells = component.create(opts)

  cells.type = 'cells'
  cells.isInteractive = true

  cells.grid = opts.grid || []
  cells.size = Math.sqrt(opts.grid.length)

  return cells
}

export function update(cells) {
  component.update(cells)
}

export function draw(cells) {
  const x = sumParents(cells, 'x') + cells.x
  const y = sumParents(cells, 'y') + cells.y
  const cellSize = cells.width / cells.size
  const margin = cellSize * 0.2
  const lineWidth = cellSize * 0.1

  for (let i = 0; i < cells.grid.length; i++) {
    if (0 === cells.grid[i]) continue
    
    const column = Math.floor(i % cells.size)
    const row    = Math.floor(i / cells.size)

    if (1 === cells.grid[i]) {
      // draw square
      ctx.fillStyle = state.color
      ctx.fillRect(
        x + column * cellSize + 4,
        y + row    * cellSize + 4,
        cellSize - 6,
        cellSize - 6,
      )
    } else if (2 === cells.grid[i]) {
      // draw a cross
      ctx.strokeStyle = state.color
      ctx.lineWidth = lineWidth
      
      ctx.beginPath()
      
      ctx.moveTo(x + column * cellSize + margin, y + row    * cellSize + margin)
      ctx.lineTo(x + column * cellSize + cellSize - margin, y + row    * cellSize + cellSize - margin)
      ctx.stroke()

      ctx.moveTo(x + column * cellSize + cellSize - margin, y + row    * cellSize + margin)
      ctx.lineTo(x + column * cellSize + margin, y + row    * cellSize + cellSize - margin)
      ctx.stroke()
    }
  }
}