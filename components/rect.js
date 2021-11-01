/* Components: Rect */
import { ctx } from '../graphics.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const rect = component.create(opts)

  rect.type        ='rect'
  rect.fill        = opts.fill || null,
  rect.stroke      = opts.stroke
  rect.strokeColor = opts.strokeColor || 'red'
  rect.globalAlpha = opts.globalAlpha || 1

  return rect
}

export function draw(rect) {
  const x = sumParents(rect, 'x') + rect.x
  const y = sumParents(rect, 'y') + rect.y

  ctx.globalAlpha = rect.globalAlpha
  
  ctx.beginPath()
  ctx.rect(
    x,
    y,
    rect.width,
    rect.height,
  )
  ctx.closePath()

  if (rect.fill) {
    ctx.fillStyle = rect.fill
    ctx.fill()
  }

  if (rect.stroke > 0) {
    ctx.strokeStyle = rect.strokeColor
    ctx.lineWidth = rect.stroke
    ctx.stroke()
  }
}