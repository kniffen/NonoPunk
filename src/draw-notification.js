import { Graphics, Text } from 'pixi.js'

export default function drawNotification(app, text) {

  const banner = new Graphics()
  const title  = new Text(
    text.toUpperCase(),
    { fontFamily : 'Roboto', fontWeight: '400', fontSize: 40, fill: 0x23C1B2 }
  )

  banner.width  = app.view.width
  banner.height = 100
  banner.lineStyle(2, 0x23C1B2)
  banner.beginFill(0x28635C)
  banner.drawRect(-2, 0, banner._width + 4, banner._height)
  banner.endFill()

  banner.y = 100
  title.y  = 100 + title.height / 2
  title.x  = app.view.width  / 2 - title.width / 2

  app.stage.addChild(banner, title)

}