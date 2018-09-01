import { Container, Graphics, Text } from 'pixi.js'

export default function drawNotification(app, text) {

  const container = new Container()
  const banner    = new Graphics()
  const title     = new Text(
    text.toUpperCase(),
    { fontFamily : 'Roboto', fontWeight: '400', fontSize: 30, fill: 0x23C1B2 }
  )

  container.name = 'notification'
  container.width  = app.view.width
  container.height = 60
  banner.lineStyle(2, 0x23C1B2)
  banner.beginFill(0x28635C)
  banner.drawRect(-2, 0, container._width + 4, container._height)
  banner.endFill()

  container.y = 70
  title.y  = title.height / 2 - 4
  title.x  = container._width  / 2 - title.width / 2

  container.addChild(banner, title)
  app.stage.addChild(container)

}