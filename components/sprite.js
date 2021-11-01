/* Components: Sprite */
import { ctx } from '../graphics.js'
import * as component from './component.js'
import { sumParents } from '../utils/utils.js'

export function create(opts = {}) {
  const sprite = component.create(opts)

  sprite.type = 'sprite'

  sprite.src = opts.src || null
  
  sprite.width  = (opts.width  || opts.src.width)  || 1
  sprite.height = (opts.height || opts.src.height) || 1
  
  sprite.draw = () => draw(sprite)

  return sprite
}

export function draw(sprite) {
  const x = sumParents(sprite, 'x') + sprite.x
  const y = sumParents(sprite, 'y') + sprite.y

  ctx.drawImage(
    sprite.src,
    x,
    y,
    sprite.width,
    sprite.height,
  )
}