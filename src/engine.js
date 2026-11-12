import { SEASONS } from './data'
// One shared animation loop: blends theme colours between seasons and eases mouse tilt.
const KEYS = ['bg', 'ink', 'ac', 'l1', 'l2']
const rgb = h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16))
const PAL = SEASONS.map(s => Object.fromEntries(KEYS.map(k => [k, rgb(s.colors[k])])))
export const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
export const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const sm = t => { t = cl(t); return t * t * (3 - 2 * t) }
// F = current (eased) season position as a float, target = where it is heading
export const state = { F: 0, target: 0, ac: '0,0,0', ink: '0,0,0', mx: 0, my: 0, tx: 0, ty: 0 }
const subs = new Set(); let raf = 0, last = 0
addEventListener('pointermove', e => { state.tx = e.clientX / innerWidth - .5; state.ty = e.clientY / innerHeight - .5 })
function tick(t) {
  const L = SEASONS.length - 1
  state.F += (state.target - state.F) * (reduce ? 1 : .1)
  const i = Math.min(L, Math.floor(state.F)), j = Math.min(L, i + 1), f = state.F - i, root = document.documentElement.style
  KEYS.forEach(k => {
    const c = PAL[i][k].map((v, n) => Math.round(v + (PAL[j][k][n] - v) * f))
    root.setProperty('--' + k, `rgb(${c})`)
    if (k === 'ac' || k === 'ink') state[k] = c.join(',')
  })
  state.mx += (state.tx - state.mx) * .08; state.my += (state.ty - state.my) * .08
  root.setProperty('--ry', state.mx * 26 + 'deg'); root.setProperty('--rx', -state.my * 18 + 'deg')
  const dt = Math.min(t - last || 16, 40) / 16; last = t
  subs.forEach(fn => fn(t, dt))
  raf = requestAnimationFrame(tick)
}
export function subscribe(fn) { subs.add(fn); if (!raf) raf = requestAnimationFrame(tick); return () => subs.delete(fn) }
export const snapTo = n => { state.target = n; state.F = n }
