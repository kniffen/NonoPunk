/* Scenes: Loading */
import state from '../state.js'
import { resolution } from '../graphics.js'
import * as components from '../components/components.js'

export function create() {
  const loading = components.scene.create()

  const text = components.text.create({
    size:  30,
    x: resolution.width  / 2,
    y: resolution.height / 2,
    color: state.color,
    align: 'center',
    value: 'Loading...',
  })

  loading.addChild(text)

  return loading
}