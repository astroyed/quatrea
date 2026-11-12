import { useLayoutEffect, useRef, useState } from 'react'
import { SEASONS } from '../data'
import { useFrame } from '../hooks'
import { state, snapTo, cl, sm } from '../engine'
import Logo from './Logo'
const N = SEASONS.length

export default function Home() {
  const stage = useRef(null), intro = useRef(null), hb = useRef(null)
  const words = useRef([]), caps = useRef([]), frames = useRef([]), last = useRef(0)
  const [active, setActive] = useState(0)
  useLayoutEffect(() => snapTo(0), [])

  useFrame(() => {
    const st = stage.current; if (!st) return
    const r = st.getBoundingClientRect(), p = cl(-r.top / (st.offsetHeight - innerHeight))
    const s = cl((p - .12) / .88) * N, i = Math.min(N - 1, Math.floor(s))
    state.target = i < N - 1 ? i + sm((s - i - .75) / .25) : N - 1 // hold each season, then blend
    const F = state.F
    intro.current.style.opacity = 1 - cl(p * 9); intro.current.style.transform = `translateY(${-p * 260}px)`
    hb.current.style.transform = `translate(-50%,-50%) scale(${.5 + .5 * cl(p * 7)}) rotate(${Math.sin(F * Math.PI) * 4}deg)`
    words.current.forEach((e, k) => (e.style.transform = `translateX(${(k - F) * 80}vw)`))
    caps.current.forEach((e, k) => { const o = cl(1 - Math.abs(k - F) * 2.6); e.style.opacity = o; e.style.transform = `translateY(${(k - F) * 60}px)`; e.style.pointerEvents = o > .5 ? 'auto' : 'none' })
    frames.current.forEach((e, k) => { const d = Math.abs(k - F); e.style.opacity = cl(1 - d); e.style.transform = `scale(${1 + d * .12})` })
    const ri = Math.round(F); if (ri !== last.current) { last.current = ri; setActive(ri) }
  })
  const jump = k => { const st = stage.current; scrollTo({ top: st.offsetTop + (st.offsetHeight - innerHeight) * (.12 + .88 * (k + .4) / N), behavior: 'smooth' }) }

  return (
    <section className="pg">
      <div id="stage" ref={stage}><div className="sticky">
        {SEASONS.map((s, k) => <div key={s.id} className="bw" aria-hidden="true" ref={el => (words.current[k] = el)}>{s.label}</div>)}
        <div id="intro" ref={intro}>
          <h1><span><i>Four seasons,</i></span><span><i>four perfumes.</i></span></h1>
          <p>One bottle for every turn of the year. Scroll to move through it.</p>
        </div>
        <div className="hb" ref={hb}><div className="bt">
          {SEASONS.map((s, k) => <div key={s.id} className="fr" ref={el => (frames.current[k] = el)}><img src={s.img} alt={`${s.name} perfume bottle`} style={{ objectPosition: s.pos }} /></div>)}
        </div></div>
        {SEASONS.map((s, k) => (
          <div key={s.id} className="cap" ref={el => (caps.current[k] = el)}>
            <h2>{s.name}</h2><p>{s.tagline}</p><a className="btn" href={'#' + s.id}>Explore {s.label}</a>
          </div>))}
        <div className="rail">{SEASONS.map((s, k) => <a key={s.id} href="#home" aria-label={s.label} className={k === active ? 'on' : ''} onClick={e => { e.preventDefault(); jump(k) }} />)}</div>
      </div></div>
      <div className="grid">{SEASONS.map(s => (
        <a key={s.id} className="pn" href={'#' + s.id} style={{ background: s.colors.bg, color: s.colors.ink }}>
          <small>{s.label}</small><h2 className="serif">{s.name}</h2><small>{s.tagline}</small>
        </a>))}</div>
      <footer><span className="serif" style={{ fontSize: '1.6rem' }}>
        <Logo />
        </span><span>Four perfumes. One year. Composed in small batches.</span>
      </footer>
    </section>)
}
