/* Components: Slider */
import { ctx } from '../graphics.js'
import { mouse } from '../controls.js'
import * as component from './component.js'
import { sumParents, isPointAABB } from '../utils/utils.js'

export function create(opts = {}) {
  const slider = component.create(opts)
  
  slider.type = 'slider'
  
  slider.width  = opts.width  || 200
  slider.height = opts.height || 20

  slider.value = (opts.value < 0 || opts.value > 1 || !opts.hasOwnProperty('value')) ? 0.5 : opts.value
  slider.color = opts.color || 'yellow'

  slider.isActive      = false
  slider.isInteractive = true

  slider.update = () => update(slider)
  slider.draw   = () => draw(slider)

  return slider
}

export function update(slider) {
  component.update(slider)

  if (isPointAABB(mouse, slider) && 0 === mouse.button) {
    slider.value = (mouse.x - slider.x) / slider.width
    slider.emit('change', slider.value)
  }
}

export function draw(slider) {
  const x = sumParents(slider, 'x') + slider.x
  const y = sumParents(slider, 'y') + slider.y

  ctx.lineWidth = 2

  // Fill
  ctx.globalAlpha = 0.5
  ctx.fillStyle = slider.color
  ctx.fillRect(x, y, slider.width * slider.value, slider.height)
  ctx.globalAlpha = 1

  // Outline
  ctx.strokeStyle = slider.color
  ctx.strokeRect(x, y, slider.width, slider.height)
}