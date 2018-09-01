import { Container, Text } from 'pixi.js'
import button from './button'

export default function page({ width, height, name, buttons }) {

  const container = new Container()
  const title = new Text(name.toUpperCase(), { fontFamily : 'Roboto', fontWeight: '400', fill: 0x23C1B2 })
  
  container.name = name.toLowerCase()
  title.x = 20
  title.y = 20

  container.addChild(title)
  
  if (buttons) {
    buttons.reverse()
    buttons.forEach((id, i) => {
      const btn = button({
        wide: true, 
        name: id, 
        width: 160, 
        height: 40, 
        x: width  - 180, 
        y: height - (i + 1) * 40 - (i + 1) * 20
      })

      container.addChild(btn)
    })
  }

  return container

}