export default function sumParents(component, key) {
  let sum = 0

  if (!component.parent) return sum
  
  const parents = [component.parent]
  sum += component.parent[key]
  while (true) {
    const parent = parents[parents.length - 1].parent
    if (!parent)
      break

    parents.push(parent)
    sum += parent[key]
  }
  return sum
}