/* Utils: resizeCanvas */
import { canvas, ctx, resolution, scale } from '../graphics.js'

export default function resizeCanvas() {
  const aspectRatio = resolution.width / resolution.height

  if (window.innerWidth <= 1280) {
    canvas.width  = 1280
    canvas.height = 1280 / aspectRatio
  } else if (window.innerWidth / window.innerHeight < aspectRatio) {
    canvas.width  = window.innerWidth
    canvas.height = window.innerWidth / aspectRatio
  } else {
    canvas.height = window.innerHeight
    canvas.width  = window.innerHeight * aspectRatio
  }

  scale.width  = canvas.width  / resolution.width
  scale.height = canvas.height / resolution.height

  ctx.scale(scale.width, scale.height)
}