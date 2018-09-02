import { Container, Graphics, Text } from 'pixi.js'

import sounds          from './sounds'
import page            from './page'
import drawTitleScreen from './draw-title-screen'

export default function drawOptions(app, state) {

  app.stage.removeChildren()

  const wrapper = page({
    width: app.view.width,
    height: app.view.height,
    name: 'options',
    buttons: ['back']
  })

  const musicSlider = slider(
    'Music volume', 
    20, 
    100, 
    sounds.music[0].volume, volume => {
      sounds.music.forEach(sound => {
        sound.volume = volume
        sound.muted = volume < 0.01
      })

      if (volume > 0.01 && !sounds.music[0].isPlaying) sounds.music[0].play()

      localStorage.musicVolume = volume
    }
  )
  
  const sfxSlider = slider(
    'SFX volume', 
    20, 
    musicSlider.y + musicSlider.height + 40, 
    sounds.sfx[0].volume, 
    volume => {
      sounds.sfx.forEach(sound => {
        sound.volume = volume
        sound.muted = volume < 0.01
      })

      if (!sounds.sfx[0].isPlaying) sounds.sfx[0].play()

      localStorage.sfxVolume = volume
    }
  )

  const colorSlider = slider(
    'Color',
    20,
    sfxSlider.y + sfxSlider.height + 40,
    state.colorHue / 360,
    val => {
      app.stage.filters[0].hue(val * 360)
      state.colorHue = val * 360
      localStorage.colorHue = val * 360
    }
  )

  wrapper.getChildByName('btn-back').on('click', () => drawTitleScreen(app, state))

  wrapper.addChild(musicSlider, sfxSlider, colorSlider)
  app.stage.addChild(wrapper)

}

function slider(name, x, y, position, cb) {
  const container = new Container()
  const title = new Text(name.toUpperCase(), { fontFamily : 'Roboto', fontWeight: '400', fontSize: 20, fill: 0x23C1B2 })
  const bar = new Graphics()

  container.x = x
  container.y = y
  container.interactive = true

  const drawBar = pos => {
    bar.clear()

    // Background
    bar.beginFill(0x000000)
    bar.drawRect(0, title.height, 500, 20)
    bar.endFill()

    // Slider
    bar.beginFill(0x28635C)
    bar.drawRect(0, title.height, 500 * pos, 20)
    bar.endFill()

    // Border
    bar.lineStyle(2, 0x23C1B2)
    bar.drawRect(0, title.height, 500, 20)
  }

  drawBar(position)

  container.on('click', e => {
    let value = (e.data.global.x - container.x) / 500
    
    if (value >= 1) value = Math.floor(value)
    
    drawBar(value)
    
    if (cb) cb(value)
  })

  container.on('mousemove', (e) => {
    if (
      (e.data.global.x < container.x || e.data.global.x > container.x + container.width)  ||
      (e.data.global.y < container.y + title.height || e.data.global.y > container.y + title.height + bar.height) ||
      e.data.buttons !== 1
    ) return

    let value = (e.data.global.x - container.x) / 500

    if (value >= 1) value = Math.floor(value)
    
    drawBar(value)

    if (cb) cb(value)
  })

  container.addChild(title, bar)

  return container
}