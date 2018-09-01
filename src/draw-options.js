import { Container, Graphics, Text } from 'pixi.js'

import page            from './page'
import drawTitleScreen from './draw-title-screen'

export default function drawOptions(app, state, sounds) {

  app.stage.removeChildren()

  const wrapper = page({
    width: app.view.width,
    height: app.view.height,
    name: 'options',
    buttons: ['back']
  })

  const musicSlider = slider('music volume', 20, 100, sounds.music)
  const sfxSlider   = slider('sfx volume',   20, musicSlider.y + musicSlider.height + 40, sounds.sfx)

  wrapper.getChildByName('btn-back').on('click', () => {
    sounds.sfx[0].play()
    drawTitleScreen(app, state, sounds)
  })

  wrapper.addChild(musicSlider, sfxSlider)
  app.stage.addChild(wrapper)

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