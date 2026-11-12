import { useEffect, useRef, useState } from 'react'
import { SEASONS } from './data'
import { useRouter } from './hooks'
import Nav from './components/Nav'
import Particles from './components/Particles'
import Home from './components/Home'
import Season from './components/Season'
import Atelier from './components/Atelier'
import Cart from './components/Cart'

export default function App() {
  const wipe = useRef(null), page = useRouter(wipe)
  const [cart, setCart] = useState([]), [toast, setToast] = useState('')
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t) }, [toast])
  const bag = cart.reduce((count, item) => count + item.quantity, 0)
  const add = (seasonId, sizeIndex) => {
    const id = `${seasonId}-${sizeIndex}`
    setCart(items => {
      const existing = items.find(item => item.id === id)
      return existing
        ? items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id, seasonId, sizeIndex, quantity: 1 }]
    })
    setToast('Added to bag')
  }
  const remove = id => setCart(items => items.filter(item => item.id !== id))
  const idx = SEASONS.findIndex(s => s.id === page)
  return (<>
    <Particles />
    <div id="wipe" ref={wipe} />
    <div id="toast" role="status" className={toast ? 'on' : ''}>{toast}</div>
    <Nav page={page} bag={bag} />
    <main>
      {page === 'home' && <Home />}
      {idx >= 0 && <Season key={page} index={idx} onAdd={add} />}
      {page === 'atelier' && <Atelier />}
      {page === 'bag' && <Cart items={cart} onRemove={remove} />}
    </main>
  </>)
}
