import { SEASONS, SIZES } from '../data'

export default function Cart({ items, onRemove }) {
  const subtotal = items.reduce((total, item) => total + SIZES[item.sizeIndex][1] * item.quantity, 0)

  return (
    <section className="pg wrap cart">
      <p>Your bag</p>
      <h1>Shopping bag</h1>
      {items.length ? (
        <>
          <div className="cart-items">
            {items.map(item => {
              const season = SEASONS.find(s => s.id === item.seasonId)
              const [ml, price] = SIZES[item.sizeIndex]
              return (
                <article className="cart-item" key={item.id}>
                  <img src={season.img} alt={`${season.name} perfume bottle`} />
                  <div className="cart-detail">
                    <h2>{season.name}, eau de parfum</h2>
                    <p>Size {ml} ml | Quantity {item.quantity}</p>
                    <button className="cart-remove" onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                  <strong>${price * item.quantity}</strong>
                </article>
              )
            })}
          </div>
          <div className="cart-subtotal"><span>Subtotal</span><strong>${subtotal}</strong></div>
        </>
      ) : <p className="cart-empty">Your bag is empty. Choose a season to find your perfume.</p>}
      <a className="btn" href="#home">Continue shopping</a>
    </section>
  )
}
