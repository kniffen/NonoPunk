/* Components: Text */
import { ctx } from '../graphics.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const text = component.create(opts)

  text.type  = 'text'

  text.align = opts.align || 'left'
  text.value = opts.value || ''

  text.size = opts.size  || 16,

  text.color = opts.color || '#FFFFFF'
 
  text.draw = () => draw(text)

  return text
}

export function draw(text) {
  const x = sumParents(text, 'x') + text.x
  const y = sumParents(text, 'y') + text.y

  ctx.fillStyle = text.color
  ctx.font      = `${text.size}px Roboto`
  ctx.textAlign = text.align
  ctx.globalAlpha = 1

  text.value
    .split('\n')
    .forEach(function(line, i) {
      ctx.fillText(
        line,
        x,
        y + text.size + text.size * i,
      )
    })
  
}