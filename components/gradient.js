/* Components: Gradient */
import { ctx } from '../graphics.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const gradient = component.create(opts)

  gradient.type      = 'gradient'
  gradient.colors    = opts.colors || ['red', 'green', 'blue']
  gradient.isFlipped = opts.isFlipped || false
  gradient.globalAlpha = opts.globalAlpha || 1

  return gradient
}

export function draw(gradient) {
  const x = sumParents(gradient, 'x') + gradient.x
  const y = sumParents(gradient, 'y') + gradient.y

  ctx.globalAlpha = gradient.globalAlpha
  
  const linearGradient = ctx.createLinearGradient(
    x,
    y,
    x + ( gradient.isFlipped ? 0 : gradient.width ),
    y + (!gradient.isFlipped ? 0 : gradient.height),
  )

  for (let i = 0; i < gradient.colors.length; i++) {
    linearGradient.addColorStop(i / (gradient.colors.length - 1), gradient.colors[i])
  }

  ctx.fillStyle = linearGradient
  ctx.fillRect(
    x,
    y,
    gradient.width,
    gradient.height,
  )

}