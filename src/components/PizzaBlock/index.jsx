import React from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { setPizzaToCart } from '../../actions/cart'
import { setTotalPriceAndTotalCount } from '../../actions/cart'

import Button from '../Button'

const PizzaBlock = ({
  imageUrl,
  name,
  price,
  sizes,
  types,
  id,
  addedPizzas,
}) => {
  const [currentDough, setCurrentDough] = React.useState(types[0])
  const [currentSize, setCurrentSize] = React.useState(sizes[0])

  const dispatch = useDispatch()
  const { cartPizzas } = useSelector((state) => state.cartReducer)
  const { pizzas } = useSelector((state) => state.pizzaReducer)

  const [currentQuantity, setCurrentQuantity] = React.useState(0)

  const dough = ['тонкое', 'традиционное']
  const allSizes = [26, 30, 40]
  React.useEffect(() => {
    if (cartPizzas.length) {
      const totalPrice = cartPizzas.reduce(
        (total, cartPizza) => total + cartPizza.price,
        0
      )
      const totalCount = cartPizzas.reduce(
        (total, cartPizza) => total + cartPizza.quantity,
        0
      )
      const pizzaPriceAndCount = {
        totalPrice,
        totalCount,
      }
      dispatch(setTotalPriceAndTotalCount(pizzaPriceAndCount))
    }
  }, [cartPizzas, dispatch])

  const addPizzaToCart = (id, imageUrl, name, currentSize, price, dough) => {
    const cartPizza = {
      id,
      imageUrl,
      name,
      currentSize,
      price,
      dough,
      quantity: 1,
    }

    const candidate = cartPizzas.find((cartPizza) => cartPizza.id === id)

    if (candidate) {
      if (candidate.quantity < 10) {
        const newCartPizzas = cartPizzas.map((cartPizza) => {
          if (cartPizza.id === candidate.id) {
            candidate.quantity++
            candidate.price =
              pizzas.find((elem) => elem.id === candidate.id).price *
              candidate.quantity
          }
          return cartPizza
        })
        dispatch(setPizzaToCart(newCartPizzas))
        setCurrentQuantity(candidate.quantity)
        return
      }
      return
    }
    dispatch(setPizzaToCart([...cartPizzas, cartPizza]))
    setCurrentQuantity(1)
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {dough &&
            dough.map((elem, index) => (
              <li
                className={classNames({
                  active: index === currentDough,
                  disabled: !types.includes(index),
                })}
                onClick={() => setCurrentDough(index)}
                key={elem}
              >
                {elem}
              </li>
            ))}
        </ul>
        <ul>
          {allSizes &&
            allSizes.map((size) => (
              <li
                className={classNames({
                  active: size === currentSize,
                  disabled: !sizes.includes(size),
                })}
                onClick={() => setCurrentSize(size)}
                key={size}
              >
                {size} см.
              </li>
            ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} Р</div>
        <Button
          onClick={() =>
            addPizzaToCart(
              id,
              imageUrl,
              name,
              currentSize,
              price,
              dough[currentDough]
            )
          }
        >
          <div className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {currentQuantity > 0 && <i>{currentQuantity}</i>}
          </div>
        </Button>
      </div>
    </div>
  )
}

export default PizzaBlock
