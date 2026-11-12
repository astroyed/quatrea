import { useLayoutEffect, useRef, useState } from 'react'
import { SEASONS, SIZES } from '../data'
import { useFrame, useInView } from '../hooks'
import { snapTo } from '../engine'
import Frame from './Frame'
import RevealText from './RevealText'
import Logo from './Logo'

function Row({ label, text }) {
  const [ref, seen] = useInView()
  return <div ref={ref} className={'row' + (seen ? ' in' : '')}><b>{label}</b><span>{text}</span></div>
}

export default function Season({ index, onAdd }) {
  const s = SEASONS[index], next = SEASONS[(index + 1) % SEASONS.length]
  const [size, setSize] = useState(1), name = useRef(null), bottle = useRef(null)
  useLayoutEffect(() => snapTo(index), [index])
  useFrame(() => { // parallax: name drifts up, bottle drifts down
    const heading = name.current, product = bottle.current
    if (!heading || !product) return
    heading.style.transform = `translate3d(0,${scrollY * -.2}px,0)`
    product.style.transform = `translate3d(0,${scrollY * .12}px,0)`
  })
  return (
    <section className="pg">
      <div className="hero">
        <p className="tag">{s.tagline}<br /><small>{s.months}</small></p>
        <h1 className="big" ref={name} aria-label={s.name}>{[...s.name].map((c, k) => <b key={k} style={{ '--k': k }} aria-hidden="true">{c}</b>)}</h1>
        <div className="hb2" ref={bottle}><Frame s={s} />
          <div className="bt">
            <img src={s.img} alt={`${s.name} perfume bottle`} style={{ objectPosition: s.pos }} />
          </div>
        </div>
        <div className="cue">Scroll</div>
      </div>
      <div className="wrap story"><RevealText text={s.story} /></div>
      <div className="wrap notes"><h2>The composition</h2>{s.notes.map(([l, t]) => <Row key={l} label={l} text={t} />)}</div>
      <div className="wrap buy">
        <h2 className="serif">{s.name}, eau de parfum</h2>
        <div className="sz">{SIZES.map(([ml], k) => <button key={ml} className={k === size ? 'on' : ''} onClick={() => setSize(k)}>{ml} ml</button>)}</div>
        <p className="serif" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>${SIZES[size][1]}</p>
        <button className="btn" onClick={onAdd}>Add to bag</button>
      </div>
      <a className="next" href={'#' + next.id} style={{ background: next.colors.bg, color: next.colors.ink }}><p>Next season</p><h2 className="serif">{next.name}</h2></a>
      <footer><span className="serif" style={{ fontSize: '1.6rem' }}>
        <Logo />
        </span><span>Four perfumes. One year. Composed in small batches.</span>
      </footer>
    </section>)
}
