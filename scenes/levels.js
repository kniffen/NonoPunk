/* Scenes: Levels */
import state from '../state.js'
import * as stage from '../stage.js'
import * as scenes from './scenes.js'
import { resolution } from '../graphics.js'
import * as components from '../components/components.js'
import levels from '../levels.js'

export function create() {
  const levelsScene = components.scene.create()

  const title = components.text.create({
    x: 20,
    y: 50,
    size: 30,
    value: 'LEVELS',
    color: state.color,
  })

  levelsScene.addChild(title)

  const sizes = [5, 10, 15, 20]
  const columns = 15
  for (let i = 0; i < sizes.length; i++) {
    const size = sizes[i]

    const label = components.text.create({
      x: 20,
      y: title.y + title.size + 30 + 240 * i,
      size: 24,
      value: `${size}x${size}`,
      color: state.color,
    })

    levelsScene.addChild(label)

    const difficultyLevents = levels.filter(level => level.size === size)
    for (const j in difficultyLevents) {
      const level = difficultyLevents[j]
      const x = 20 + Math.floor(level.id % columns) * 100
      const y = label.y + label.size + 10 + 100 * Math.floor(j / columns)
      const width = 70
      const height = 70

      if (state.solvedLevels.includes(level.id)) {
        const preview = components.preview.create({
          x,
          y,
          width,
          height,
          columns: size,
          rows: size,
          grid: level.solution,
          isInteractive: true,
        })

        preview.on('mouseup', function() {
          stage.setScene(scenes.board.create(level.id))
        })

        levelsScene.addChild(preview)

      } else {
        const btn = components.button.create({
          x,
          y,
          width,
          height,
          text: (level.id + 1).toString(),
          color: state.color,
        })

        btn.on('mouseup', function() {
          stage.setScene(scenes.board.create(level.id))
        })

        levelsScene.addChild(btn)
      }
    }

  }

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
  
  levelsScene.addChild(backBtn)

  return levelsScene
}