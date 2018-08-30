import { Container, Sprite, Texture, Text, Graphics } from 'pixi.js'

export default function drawClues(container, state) {
  const rows    = state.solution
  const columns = []
  const margin = container._height / 1.5 / state.grid.length

  for (const y in rows) {
    for (const x in rows[y]) {
      if (!columns[x]) columns[x] = []
      columns[x][y] = rows[y][x]
    }
  }

  // Backgrounds
  const horizontalCluesBkg = createGradient(2, container._height / 3, container._width / 3, container._height / 1.5, '#090A0C', '#28635C')
  const verticalCluesBkg   = createGradient(container._width / 3, 2, container._width / 1.5, container._height / 3, '#090A0C', '#28635C')

  container.addChild(horizontalCluesBkg, verticalCluesBkg)

  // hightlights
  const horizontalHightlight = createGradient(2, container._height / 3, container._width / 3, margin, '#090A0C', '#178076')
  const verticalHightlight   = createGradient(container._width / 3, 2, margin, container._height / 3, '#090A0C', '#178076')

  horizontalHightlight.name = 'horizontal-highlight'
  verticalHightlight.name   = 'vertical-highlight'

  container.addChild(horizontalHightlight, verticalHightlight)

  // Horizontal numbers
  for (const y in rows) {
    const clues = rows[y].join('').match(/1+/g)
    const posY = container._height / 3 + y * margin + margin / 2

    if (clues) {
      clues.reverse()
      for (const x in columns) {
        const posX  = container._width  / 3 - x * margin - margin / 2
        const value = clues[x] ? clues[x].length : ''
        drawNum(container, value, posX, posY, margin)
      }
    } else {
      const posX = container._width  / 3 - margin / 2
      drawNum(container, 0, posX, posY, margin)
    }
  }

  // Vertical numbers
  for (const x in columns) {
    const clues = columns[x].join('').match(/1+/g)
    const posX  = container._width  / 3 + x * margin + margin / 2

    if (clues) {
      clues.reverse()
      for (const y in columns[x]) {
        const posY = container._height / 3 - y * margin - margin / 2
        const value = clues[y] ? clues[y].length : ''
        drawNum(container, value, posX, posY, margin)
      }
    } else {
      const posY = container._height / 3 - margin / 2
      drawNum(container, 0, posX, posY, margin) 
    }
  }

}

function createGradient(x, y, width, height, colorStart, colorStop) {
  const container = new Container()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createLinearGradient(0, 0, y, x)

  container.width = width
  container.height = height
  container.x = x
  container.y = y
  canvas.width  = width
  canvas.height = height
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorStop)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const backgroundGradient = new Sprite(Texture.fromCanvas(canvas))

  container.addChild(backgroundGradient)

  return container
}

function drawNum(container, value, x, y, margin) {

  const num = new Text(value, { fontFamily : 'Roboto', fontWeight: '400', fontSize: margin / 2, fill: 0x23C1B2 })

  num.position.set(x, y)
  num.anchor.set(0.5, 0.5)

  container.addChild(num)

}