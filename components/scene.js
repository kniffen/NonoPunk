/* Components: Scene */
import * as components from './components.js'
import createEventEmitter from '../utils/createEventEmitter.js'

export function create(opts = {}) {
  const scene = Object.assign(
    components.container.create(),
    createEventEmitter(),
  )

  scene.type = 'scene'

  return scene
}