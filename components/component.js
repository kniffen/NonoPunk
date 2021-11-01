import { mouse } from '../controls.js'
import { createEventEmitter, isPointAABB, sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const component = createEventEmitter()

  component.x = opts.x || 0
  component.y = opts.y || 0
  
  component.width  = opts.width  || 1
  component.height = opts.height || 1
  
  component.isInteractive = opts.isInteractive || false
  component.isHover       = false
  component.isMouseDown   = false

  component.parent = null

  component.update = () => update(component)

  return component
}

export function update(component) {
  if (!component.isInteractive) return

  const isMouseInside = isPointAABB(
    mouse,
    {
      x: sumParents(component, 'x') + component.x,
      y: sumParents(component, 'y') + component.y,
      width:  component.width,
      height: component.height,
    }
  )

  const _mouse = !isMouseInside ? null : {
    globalX: mouse.x,
    globalY: mouse.y,
    x: mouse.x - (sumParents(component, 'x') + component.x),
    y: mouse.y - (sumParents(component, 'y') + component.y),
    button: mouse.button,
  }

  if (isMouseInside) {
    component.emit('mousemove', _mouse)
  }

  if (!component.isHover && isMouseInside) {
    component.isHover = true
    component.emit('mouseover', _mouse)
  } else if (component.isHover && !isMouseInside) {
    component.isHover = false
    component.emit('mouseleave')
  }

  if (!component.isMouseDown && isMouseInside && null !== mouse.button) {
    component.isMouseDown = true
    component.emit('mousedown', _mouse)
  } else if (component.isMouseDown && null === mouse.button) {
    component.isMouseDown = false
    component.emit('mouseup', _mouse)
  }
}