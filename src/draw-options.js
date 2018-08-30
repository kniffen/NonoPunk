import { Container, Graphics, Text } from 'pixi.js'

import drawTitleScreen from './draw-title-screen'
import button          from './button'

export default function drawOptions(app, state, sounds) {

  app.stage.removeChildren()

  // Title
  const title = new Text('OPTIONS', { fontFamily : 'Roboto', fontWeight: '400', fill: 0x23C1B2 })

  title.x = 20
  title.y = 20

  const musicSlider = slider('music volume', 20, title.height + 80, sounds.music)
  const sfxSlider   = slider('sfx volume',   20, musicSlider.y + musicSlider.height + 40, sounds.sfx)

  // Back button
  const backBtnWidth  = app.view.width * 0.11
  const backBtnHeight = backBtnWidth / 394 * 84

  const btn = button({
    wide: true,
    name: 'Back',
    width: backBtnWidth,
    height: backBtnHeight,
    x: app.view.width  - backBtnWidth  - 20,
    y: app.view.height - backBtnHeight - 20
  })

  btn.on('click', () => {
    sounds.sfx[0].play()
    drawTitleScreen(app, state, sounds)
  })

  app.stage.addChild(title, musicSlider, sfxSlider, btn)

}

function slider(name, x, y, sounds) {
  const container = new Container()
  const title = new Text(name.toUpperCase(), { fontFamily : 'Roboto', fontWeight: '400', fontSize: 20, fill: 0x23C1B2 })
  const bar = new Graphics()

  container.x = x
  container.y = y

  bar.y = title.height + 10
  bar.width = 500
  bar.height = 20
  bar.interactive = true
  
  const draw = (length) => {
    bar.clear()

    // Background
    bar.beginFill(0x000000)
    bar.drawRect(0, 0, bar._width, bar._height)
    bar.endFill()

    // Slider
    bar.beginFill(0x28635C)
    bar.drawRect(0, 0, length, bar._height)
    bar.endFill()

    // Border
    bar.lineStyle(2, 0x23C1B2)
    bar.drawRect(0, 0, bar._width, bar._height)
    
  }

  draw(500 * sounds[0].volume)

  bar.on('click', (e) => {
    draw(e.data.global.x - 20)
    sounds.forEach(sound => sound.volume = 1 / 500 * (e.data.global.x - 20))
  })

  bar.on('mousemove', (e) => {
    
    if (
      (e.data.global.x < container.x || e.data.global.x > container.x + bar._width)  ||
      (e.data.global.y < container.y + bar.y || e.data.global.y > container.y + bar.y + bar._height) ||
      e.data.buttons !== 1
    ) return

    draw(e.data.global.x - 20)
    sounds.forEach(sound => sound.volume = 1 / 500 * (e.data.global.x - 20))
  })


  container.addChild(title, bar)

  return container
}