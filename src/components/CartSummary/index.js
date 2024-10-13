import './index.css'

const CartSummary = props => {
  const {totalAmount, allItems} = props
  return (
    <div className="summary">
      <div>
        <h1 className="total">
          Order Total: <span className="toAmo">Rs {totalAmount}/-</span>
        </h1>
        <p className="total">{allItems} items in cart</p>
        <button className="checkButton">Checkout</button>
      </div>
    </div>
  )
}
export default CartSummary
