/* Main */
import { canvas } from './graphics.js'
import resizeCanvas from './utils/resizeCanvas.js'
import state from './state.js'
import * as stage from './stage.js'

function gameloop() {
  stage.update()
  stage.draw()
  
  window.requestAnimationFrame(gameloop)
}

state.load()
resizeCanvas()

document.body.addEventListener('contextmenu', e => e.preventDefault())
document.body.appendChild(canvas)

window.addEventListener('resize', function() {
  resizeCanvas()
})

import('./scenes/scenes.js')
  .then(function(scenes) {
    stage.setScene(scenes.title.create())

    window.requestAnimationFrame(gameloop)
  })