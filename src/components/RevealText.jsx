import { useRef } from 'react'
import { useFrame } from '../hooks'
import { cl } from '../engine'
// Words brighten one by one as the paragraph scrolls into view.
export default function RevealText({ text, className, style }) {
  const box = useRef(null), words = text.split(' ')
  useFrame(() => {
    const el = box.current; if (!el) return
    const r = el.getBoundingClientRect(), p = cl((innerHeight * .85 - r.top) / (innerHeight * .55)), n = words.length
    ;[...el.children].forEach((w, k) => (w.style.opacity = .15 + .85 * cl(p * n * 1.1 - k)))
  })
  return <p ref={box} className={className} style={style}>{words.map((w, k) => <span key={k} className="w">{w} </span>)}</p>
}
