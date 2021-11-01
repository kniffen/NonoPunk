/* Scenes: Title */
import state from '../state.js'
import * as stage from '../stage.js'
import * as scenes from './scenes.js'
import * as components from '../components/components.js'
import { resolution } from '../graphics.js'
import { images } from '../assets.js'

export function create() {
  const titleScene = components.scene.create()

  const logo = components.sprite.create({
    src: images.logo,
    x:   resolution.width / 2 - images.logo.width / 2,
    y:   150,
  })

  const continueBtn = components.button.create({
    x: state.solvedLevels.length > 0 ? resolution.width / 2 - 250 : resolution.width + 2000,
    y: 450,
    width: 500,
    height: 100,
    color: state.color,
    text: 'Continue'
  })

  const newGameBtn = components.button.create({
    x: resolution.width / 2 - 250,
    y: 600,
    width: 500,
    height: 100,
    color: state.color,
    text: 'New game'
  })

  const howToPlayBtn = components.button.create({
    x: resolution.width / 2 - 250,
    y: 750,
    width: 500,
    height: 100,
    color: state.color,
    text: 'How to play'
  })


  const optionsBtn = components.button.create({
    x: resolution.width / 2 - 250,
    y: 900,
    width: 500,
    height: 100,
    color: state.color,
    text: 'Options'
  })

  continueBtn.on('mouseup', function() {
    stage.setScene(scenes.levels.create())
  })
  
  newGameBtn.on('mouseup', function() {
    if (state.solvedLevels.length > 0 && confirm('Your current progress will be deleted')) {
      state.solvedLevels = []
      state.save()
      stage.setScene(scenes.levels.create())
    } else if (state.solvedLevels.length <= 0) {
      stage.setScene(scenes.levels.create())
    }
  })

  howToPlayBtn.on('mouseup', function() {
    window.open('https://en.wikipedia.org/wiki/Nonogram', '_blank')
  })
  
  optionsBtn.on('mouseup', function() {
    stage.setScene(scenes.options.create())
  })

  titleScene.addChild(logo)
  titleScene.addChild(continueBtn)
  titleScene.addChild(newGameBtn)
  titleScene.addChild(howToPlayBtn)
  titleScene.addChild(optionsBtn)

  // Copyright text
  titleScene.addChild(components.text.create({
    x: resolution.width  - 20,
    y: resolution.height - 60,
    size: 12,
    color: state.color,
    align: 'right',
    value: 'v1.0.0\n\nCOPYRIGHT @ 2018-2021 KNIFFEN',
  }))

  return titleScene
}