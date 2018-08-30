import { Sprite, Texture } from 'pixi.js'

export default function drawGridDeviders(container, state) {

  const margin  = container._height / 1.5 / state.grid.length

  for (let y = 0; y <= state.grid.length; y++) {
    container.addChild(devider(
      2,
      container._height / 3 + y * margin,
      container._width,
      y % 5 ? 1 : 2
    ))
  }

  for (let x = 0; x <= state.grid[0].length; x++) {
    container.addChild(devider(
      container._width / 3 + x * margin,
      2,
      x % 5 ? 1 : 2,
      container._height
    ))
  }

}

function devider(x, y, width, height) {

  const canvas = document.createElement('canvas')
  const ctx    = canvas.getContext('2d')

  canvas.width  = width
  canvas.height = height

  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0,    '#090A0C')
  gradient.addColorStop(0.25, '#23C1B2')
  gradient.addColorStop(1,    '#23C1B2')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const line = new Sprite(Texture.fromCanvas(canvas))
  line.width  = width
  line.height = height 
  line.x = x
  line.y = y

  return line
}