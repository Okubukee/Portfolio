export const projectAnimators = new Map()
const draws = new Set()
let rafId = null

function loop(t) {
  projectAnimators.forEach((fn, canvas) => {
    try { fn(t) } catch { projectAnimators.delete(canvas) }
  })
  draws.forEach(fn => {
    try { fn(t) } catch { draws.delete(fn) }
  })
  rafId = requestAnimationFrame(loop)
}

export function addDraw(fn) {
  draws.add(fn)
  if (!rafId) rafId = requestAnimationFrame(loop)
  return () => {
    draws.delete(fn)
    if (draws.size === 0 && projectAnimators.size === 0) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
  }
}
