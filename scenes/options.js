/* Scenes: Options */
import state from '../state.js'
import * as stage from '../stage.js'
import * as scenes from './scenes.js'
import * as components from '../components/components.js'
import { resolution } from '../graphics.js'
import { sounds } from '../assets.js'

export function create() {
  const options = components.scene.create()

  const title = components.text.create({
    x: 20,
    y: 50,
    size: 30,
    color: state.color,
    value: 'OPTIONS',
  })

  const musicSliderLabel = components.text.create({
    x: 20,
    y: 150,
    size: 24,
    color: state.color,
    value: 'MUSIC VOLUME',
  })

  const musicSlider = components.slider.create({
    x: 20,
    y: musicSliderLabel.y + musicSliderLabel.size + 10,
    width: 500,
    value: 0,
    color: state.color,
  })

  const sfxSliderLabel = components.text.create({
    x: 20,
    y: 250,
    size: 24,
    value: 'SFX VOLUME',
    color: state.color,
  })

  const sfxSlider = components.slider.create({
    x: 20,
    y: sfxSliderLabel.y + sfxSliderLabel.size + 10,
    width: 500,
    value: 0.5,
    color: state.color,
  })

  const copyrightText = components.text.create({
    x: 20,
    y: resolution.height - 50,
    size: 14,
    color: state.color,
    value: 'Music: Edge of Tomorrow by TeknoAXE\nLicense: Creative Commons Attribution 4.0 International License',
  })

  musicSlider.on('change', function(volume) {
    sounds.music.volume = volume
    sounds.music.play()
  })

  sfxSlider.on('change', function(volume) {
    sounds.click.volume = volume
    sounds.click.play()
  })

  const backBtn = components.button.create({
    x: resolution.width - 220,
    y: resolution.height - 80,
    width: 200,
    text: 'back',
    color: state.color,
  })

  backBtn.on('mouseup', function() {
    stage.setScene(scenes.title.create())
  })

  options.addChild(title)

  options.addChild(musicSliderLabel)
  options.addChild(musicSlider)
  options.addChild(sfxSliderLabel)
  options.addChild(sfxSlider)

  options.addChild(copyrightText)

  options.addChild(backBtn)

  return options
}