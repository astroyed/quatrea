import { useEffect, useRef, useState } from 'react'
import { SEASONS } from './data'
import { useRouter } from './hooks'
import Nav from './components/Nav'
import Particles from './components/Particles'
import Home from './components/Home'
import Season from './components/Season'
import Atelier from './components/Atelier'

export default function App() {
  const wipe = useRef(null), page = useRouter(wipe)
  const [bag, setBag] = useState(0), [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t) }, [toast])
  const add = () => { setBag(b => b + 1); setToast('Added to bag') }
  const idx = SEASONS.findIndex(s => s.id === page)
  return (<>
    <Particles />
    <div id="wipe" ref={wipe} />
    <div id="toast" role="status" className={toast ? 'on' : ''}>{toast}</div>
    <Nav page={page} bag={bag} onBag={() => setToast(bag ? `${bag} item(s) in your bag` : 'Your bag is empty. Choose a season.')} />
    <main>
      {page === 'home' && <Home />}
      {idx >= 0 && <Season key={page} index={idx} onAdd={add} />}
      {page === 'atelier' && <Atelier />}
    </main>
  </>)
}
