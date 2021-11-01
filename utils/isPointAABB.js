/* Utils: isPointAABB */
export default function isPointAABB(a, b) {
  return (a.x >= b.x && a.x <= b.x + b.width) &&
         (a.y >= b.y && a.y <= b.y + b.height)
}