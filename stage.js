/* Stage */
import { ctx, resolution } from './graphics.js'

export let scene = null

export function update() {
  if (!scene) return

  scene.update()
}

export function draw() {
  ctx.clearRect(0, 0, resolution.width, resolution.height)
  
  if (!scene) return

  scene.draw()
}

export function setScene(newScene) {
  scene = newScene
}