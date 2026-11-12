import { useEffect, useRef } from 'react'
import { useFrame } from '../hooks'
import { state, reduce } from '../engine'
import { SEASONS } from '../data'
const N = reduce ? 30 : 90
export default function Particles() {
  const cv = useRef(null)
  const P = useRef(Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), z: .3 + Math.random() * .7, r: Math.random() * 6.28, ph: Math.random() * 6.28 })))
  useEffect(() => {
    const c = cv.current, fit = () => { const d = Math.min(devicePixelRatio, 2); c.width = innerWidth * d; c.height = innerHeight * d; c.getContext('2d').setTransform(d, 0, 0, d, 0, 0) }
    fit(); addEventListener('resize', fit); return () => removeEventListener('resize', fit)
  }, [])
  useFrame((t, dt) => {
    const g = cv.current.getContext('2d'), kind = SEASONS[Math.round(state.F)].particle, W = innerWidth, H = innerHeight
    g.clearRect(0, 0, W, H)
    P.current.forEach(q => {
      const sw = Math.sin(q.ph + t / 1400)
      if (kind === 'petal') { q.y += .0007 * q.z * dt; q.x += (.0003 + sw * .0004) * dt; q.r += .02 }
      else if (kind === 'mote') { q.y -= .0004 * q.z * dt; q.x += sw * .0003 * dt; q.r += .01 }
      else if (kind === 'leaf') { q.y += .0014 * q.z * dt; q.x += sw * .0012 * dt; q.r += .03 }
      else { q.y += .0006 * q.z * dt; q.x += sw * .0003 * dt }
      if (q.y > 1.05) q.y = -.05; if (q.y < -.05) q.y = 1.05; if (q.x > 1.05) q.x = -.05; if (q.x < -.05) q.x = 1.05
      const z = q.z * (kind === 'snow' ? 4 : kind === 'mote' ? 7 : 11)
      g.save(); g.translate(q.x * W, q.y * H); g.rotate(q.r); g.beginPath()
      if (kind === 'petal') { g.fillStyle = `rgba(${state.ac},.6)`; g.ellipse(0, 0, z, z * .5, 0, 0, 6.3) }
      else if (kind === 'mote') { g.fillStyle = `rgba(255,248,220,${.35 + sw * .2})`; g.shadowColor = '#fff3b0'; g.shadowBlur = 14; g.arc(0, 0, z * .5, 0, 6.3) }
      else if (kind === 'leaf') { g.fillStyle = `rgba(${state.ac},.75)`; g.moveTo(0, -z); g.quadraticCurveTo(z * .8, 0, 0, z); g.quadraticCurveTo(-z * .8, 0, 0, -z) }
      else { g.fillStyle = `rgba(${state.ink},.75)`; g.arc(0, 0, z * .5, 0, 6.3) }
      g.fill(); g.restore()
    })
  })
  return <canvas ref={cv} id="cv" />
}
