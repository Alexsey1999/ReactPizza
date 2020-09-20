import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Content from './components/Content'
import Cart from './components/Cart'
import CartEmpty from './components/CartEmpty'

function App() {
  const { cartPizzas } = useSelector((state) => state.cartReducer)

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Route exact path="/">
          <Content />
        </Route>
        <Route exact path="/cart">
          {!cartPizzas.length ? <CartEmpty /> : <Cart />}
        </Route>
      </div>
    </div>
  )
}

export default App
