import { Container, Text, Texture, Sprite } from 'pixi.js'

function button({ name, wide, width, height, x, y }) {
  
  let texture, textureFilled

  if (wide) {
    texture       = Texture.fromImage('../assets/btn-wide.png')
    textureFilled = Texture.fromImage('../assets/btn-wide-filled.png')
  } else {
    texture       = Texture.fromImage('../assets/btn.png')
    textureFilled = Texture.fromImage('../assets/btn-filled.png')
  }

  const btn = new Container()
  
  btn.name = `btn-${name}`
  btn.buttonMode  = true
  btn.interactive = true
  btn.width  = width
  btn.height = height
  btn.x = x
  btn.y = y

  const sprite = new Sprite(texture)
  const text   = new Text(name.toUpperCase(), { fontFamily : 'Roboto', fontWeight: '400', fontSize: height / 2, fill: 0x23C1B2 })

  sprite.width  = width
  sprite.height = height

  text.x = width  / 2 - text.width  / 2
  text.y = height / 2 - text.height / 2

  btn
    .on('mouseover', () => {
      sprite.texture = textureFilled
      text.tint   = 0x000000
    })
    .on('mouseout', () => {
      sprite.texture = texture
      text.tint   = 0xFFFFFF
    })

  btn.addChild(sprite, text)

  return btn

}

export default button