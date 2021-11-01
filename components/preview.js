/* Components: Preview */
import { ctx } from '../graphics.js'
import state from '../state.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const preview = component.create(opts)
  
  preview.type = 'preview'

  preview.columns = opts.columns || 1
  preview.rows    = opts.rows    || 1
  preview.grid    = opts.grid    || []

  return preview
}

export function update(preview) {
  component.update(preview)
}

export function draw(preview) {
  const x = sumParents(preview, 'x') + preview.x
  const y = sumParents(preview, 'y') + preview.y

  ctx.fillStyle = state.color

  // Background
  ctx.globalAlpha = 0.3
  ctx.fillRect(x, y, preview.width, preview.height)
  ctx.globalAlpha = 1

  for (let i = 0; i < preview.grid.length; i++) {
    if (1 !== preview.grid[i]) continue
    ctx.fillRect(
      x + Math.floor(i % preview.columns) * preview.width  / preview.columns,
      y + Math.floor(i / preview.rows)    * preview.height / preview.rows,
      preview.width  / preview.columns,
      preview.height / preview.rows,
    )
  }
}