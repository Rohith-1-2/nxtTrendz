import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  removeAllCartItems = () => {
    this.setState({
      cartList: [],
    })
  }
  removeCartItem = identity => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== identity),
    }))
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = identity => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === identity) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        } else {
          return {...item}
        }
      }),
    }))
  }
  decrementCartItemQuantity = (identity,quantity) => {
    if (quantity > 1){
      this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === identity) {
            return {
              ...item,
              quantity: item.quantity - 1,
            }
        } else {
          return {...item}
        }
      }),
    }))
    }
    else{
      this.removeAllCartItems(identity)
    }
  }
  addCartItem = product => {
    const {cartList} = this.state
    const inorOut = cartList.filter(item => item.id === product.id)
    if (inorOut.length !== 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (product.id === item.id) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            }
          } else {
            return {...item}
          }
        }),
      }))
    } else {
      console.log(product)
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
