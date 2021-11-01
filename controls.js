/* Controls */
import { canvas, scale } from './graphics.js'
import * as stage from './stage.js'

export const mouse = {
  x: 0,
  y: 0,
  button: null,
}

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.layerX / scale.width
  mouse.y = e.layerY / scale.height

  stage.scene.emit('mousemove', mouse)
})

window.addEventListener('mousedown', function(e) {
  mouse.button = e.button
  stage.scene.emit('mousedown', mouse)
})

window.addEventListener('mouseup', function(e) {
  mouse.button = null
  stage.scene.emit('mouseup', mouse)
})