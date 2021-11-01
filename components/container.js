/* Components: Container */
import * as components from './components.js'

export function create(opts = {}) {
  const container = components.component.create(opts)
 
  container.type     = 'container'
  container.children = []
  container.parent   = null

  container.addChild = (child) => addChild(child, container)
  container.addChildren = (children) => children.forEach(child => addChild(child, container))

  container.update = () => update(container)
  container.draw   = () => draw(container)

  return container
}

function addChild(child, container) {
  child.parent = container

  container.children.push(child)
}

export function update(container) {
  components.component.update(container)

  for (const child of container.children) {
    if (components[child.type].update) components[child.type].update(child)
  }
}

export function draw(container) {
  for (const child of container.children) {
    components[child.type].draw(child)
  }
}