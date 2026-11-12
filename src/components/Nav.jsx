import { SEASONS } from '../data'
import Logo from './Logo'
export default function Nav({ page, bag }) {
  const links = [['home', 'Home'], ...SEASONS.map(s => [s.id, s.label]), ['atelier', 'About']]
  return (
    <nav className="nav">
      <a className="logo" href="" aria-label="Quatrea home"><Logo /></a>
      <div className="links">{links.map(([id, t]) => <a key={id} href={'#' + id} className={page === id ? 'on' : ''}>{t}</a>)}</div>
      <a className="bag" href="#bag" aria-current={page === 'bag' ? 'page' : undefined}>Bag {bag}</a>
    </nav>)
}
