import { ctx, canvas } from '../graphics.js'
import { sounds } from '../assets.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts) {
  const button = component.create(opts)

  button.type = 'button'

  button.width  = opts.width  || 50
  button.height = opts.height || 50

  button.text = opts.text || ''
  button.color = opts.color || '#FFFFFF'

  button.isInteractive = opts.isInteractive || true

  button.on('mouseup', function() {
    sounds.click.currentTime = 0
    sounds.click.play()
  })
  
  return button
}

export function update(button) {
  component.update(button)  
}

export function draw(button) {
  const x = sumParents(button, 'x') + button.x
  const y = sumParents(button, 'y') + button.y
  
  ctx.lineWidth   = 4
  ctx.lineCap     = 'square'
  ctx.strokeStyle = button.color
  ctx.fillStyle   = button.color

  // Outline
  ctx.beginPath()
  ctx.moveTo(x,                                       y)
  ctx.lineTo(x + button.width - button.height * 0.25, y)
  ctx.lineTo(x + button.width,                        y + button.height * 0.25)
  ctx.lineTo(x + button.width,                        y + button.height)
  ctx.lineTo(x + button.height * 0.25,                y + button.height)
  ctx.lineTo(x,                                       y + button.height * 0.75)
  ctx.lineTo(x,                                       y)
  ctx.stroke()
  if (button.isHover) ctx.fill()

  // Text
  ctx.fillStyle = button.isHover ? '#000000' : button.color
  ctx.font = `${button.height * 0.5}px Roboto`
  ctx.textAlign = 'center'
  ctx.fillText(button.text.toUpperCase(), x + button.width / 2, y + button.height * 0.7)

  if (button.isHover)
    canvas.style.cursor = 'pointer'
}