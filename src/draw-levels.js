import { Container, Graphics, Text } from 'pixi.js'

import levels   from '../levels.json'
import button   from './button'
import drawGame from './draw-game'
import drawTitleScreen from './draw-title-screen'

export default function drawLevels(app, state, sounds) {

  app.stage.removeChildren()

  // Page title
  const pageTitle = new Text('LEVELS', { fontFamily : 'Roboto', fontWeight: '400', fill: 0x23C1B2  })
  
  pageTitle.x = 20
  pageTitle.y = 20

  app.stage.addChild(pageTitle)

  // 
  const parsedLevels = levels.map((data, id) => ({id, data}))
  const difficulties = [
    {name: '5x5',   levels: parsedLevels.filter(level => level.data.length === 5)},
    {name: '10x10', levels: parsedLevels.filter(level => level.data.length === 10)},
    {name: '15x15', levels: parsedLevels.filter(level => level.data.length === 15)},
    {name: '20x20', levels: parsedLevels.filter(level => level.data.length === 20)}
  ]

  difficulties.forEach((difficulty, i) => {
    const container = new Container()
    const title = new Text(difficulty.name, { fontFamily : 'Roboto', fontWeight: '400', fill: 0x23C1B2  })
    const columns = 15
    const margin = 40
    const dim = (app.view.width - columns * margin - margin) / columns

    container.width  = app.view.width - margin
    container.height = title.height + difficulty.levels.length / columns * dim + margin

    container.x = 20
    container.y = pageTitle.y + pageTitle.height * 2

    for (let j = 0; j < i; j++) {
      container.y += (difficulties[j].levels.length / columns) * dim + dim + margin
    }

    container.addChild(title)

    difficulty.levels.forEach((level, j) => {
      const x = j % columns * dim + j % columns * margin / 2
      const y = title.height + Math.floor(j / columns) * dim + Math.floor(j / columns) * (margin / 2)
      let btn
      
      if(level.id < state.currentProgress) {
        btn = new Graphics()
        
        btn.width = dim
        btn.height = dim
        btn.x = x
        btn.y = y
        btn.interactive = true
        btn.buttonMode  = true
        
        for (const y in level.data) {
          for(const x in level.data) {

            btn.beginFill(level.data[y][x] ? 0x23C1B2 : 0x28635C)
            btn.drawRect(
              x * (dim / level.data[x].length),
              y * (dim / level.data.length),
              dim / level.data[x].length,
              dim / level.data.length
            )
            btn.endFill()
          }
        }

      } else {
        btn = button({ name: (level.id + 1).toString(), width: dim, height: dim, x, y })
      }

      btn.on('click', e => {
        if (level.id > state.currentProgress) return

        sounds.sfx[0].play()
        
        state.currentLevel = level.id
        state.solution     = levels[level.id]
        state.grid         = levels[level.id].map(row => row.map(() => 0))
        localStorage.state = JSON.stringify(state)
        
        drawGame(app, state, sounds)
      })
      
      container.addChild(btn)

    })

    app.stage.addChild(container)

  })

  // Back button
  const backBtnWidth  = app.view.width * 0.11
  const backBtnHeight = backBtnWidth / 394 * 84

  const backBtn = button({
    wide: true,
    name: 'Back',
    width: backBtnWidth,
    height: backBtnHeight,
    x: app.view.width  - backBtnWidth  - 20,
    y: app.view.height - backBtnHeight - 20
  })

  backBtn.on('click', () => {
    sounds.sfx[0].play()
    drawTitleScreen(app, state, sounds)
  })

  app.stage.addChild(backBtn)

}