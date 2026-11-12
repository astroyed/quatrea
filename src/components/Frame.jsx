// Arch-framed product photo with mouse tilt (tilt comes from CSS vars set by the engine)
export default function Frame({ s }) {
  return 
    <div className="bt">
      <div className="fr">
        <img src={s.img} alt={`${s.name} perfume bottle`} 
        style={{ objectPosition: s.pos }} />
      </div>
    </div>
}
