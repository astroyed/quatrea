import { useLayoutEffect, useRef } from 'react'
import { SEASONS, ATELIER } from '../data'
import { useFrame } from '../hooks'
import { snapTo } from '../engine'
import RevealText from './RevealText'
import Logo from './Logo'

export default function Atelier() {
  const ring = useRef(null)
  useLayoutEffect(() => snapTo(0), [])
  useFrame(() => { ring.current.style.transform = `rotate(${scrollY * .12}deg)` })
  const P = (a, r = 88) => `${r * Math.cos(a)} ${r * Math.sin(a)}`
  return (
    <section className="pg"><div className="wrap atel"><div>
      <svg className="ring" ref={ring} viewBox="-100 -100 200 200" aria-hidden="true">
        {SEASONS.map((s, i) => { const a = i * Math.PI / 2; return <path key={s.id} d={`M${P(a)} A88 88 0 0 1 ${P(a + Math.PI / 2 - .08)}`} fill="none" stroke={s.colors.l2} strokeWidth="6" strokeLinecap="round" /> })}
        <text x="0" y="6" textAnchor="middle" fontFamily="Fraunces" fontWeight="200" fontSize="22" fill="currentColor">Quatrea</text>
      </svg>
      <RevealText className="serif" style={{ fontSize: 'clamp(1.6rem,3.4vw,2.6rem)', lineHeight: 1.3 }} text={ATELIER} />
    </div></div>
     <footer><span className="serif" style={{ fontSize: '1.6rem' }}>
            <Logo />
            </span><span>Four perfumes. One year. Composed in small batches.</span>
          </footer>
    </section>)
}
