import { useEffect, useRef, useState } from 'react'
import { subscribe, reduce } from './engine'
import { SEASONS } from './data'

export function useFrame(fn) { // run fn(time, dt) every animation frame
  const ref = useRef(fn); ref.current = fn
  useEffect(() => subscribe((t, dt) => ref.current(t, dt)), [])
}
export function useInView(th = .6) { // [ref, seen] – seen turns true once visible
  const ref = useRef(null), [seen, set] = useState(false)
  useEffect(() => { const io = new IntersectionObserver(([e]) => e.isIntersecting && set(true), { threshold: th }); io.observe(ref.current); return () => io.disconnect() }, [th])
  return [ref, seen]
}
export const PAGES = ['home', ...SEASONS.map(s => s.id), 'atelier']
const valid = () => { const h = location.hash.slice(1); return PAGES.includes(h) ? h : 'home' }

// Hash routing with a circular colour wipe starting where the user clicked.
export function useRouter(wipeRef) {
  const [page, setPage] = useState(valid)
  console.log('reduce', page, reduce)
  useEffect(() => {
    let cur = page, cx = innerWidth / 2, cy = innerHeight / 2
    const down = e => { cx = e.clientX; cy = e.clientY }
    const go = async () => {
      const id = valid(); if (id === cur) return
      const w = wipeRef.current, s = SEASONS.find(s => s.id === id)
      if (!reduce) {
        w.style.background = s ? s.colors.bg : SEASONS[0].colors.bg; w.style.display = 'block'
        await w.animate([{ clipPath: `circle(0 at ${cx}px ${cy}px)` }, { clipPath: `circle(150vmax at ${cx}px ${cy}px)` }], { duration: 700, easing: 'cubic-bezier(.7,0,.2,1)' }).finished
      }
      cur = id; setPage(id); scrollTo(0, 0)
      if (!reduce) { await w.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600 }).finished; w.style.display = 'none' }
    }
    addEventListener('pointerdown', down, true); addEventListener('hashchange', go)
    return () => { removeEventListener('pointerdown', down, true); removeEventListener('hashchange', go) }
  }, [])
  return page
}
