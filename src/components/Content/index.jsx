import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPizzas } from '../../actions/pizzas'

import Categories from '../Categories'
import SortPopup from '../SortPopup'
import PizzaBlock from '../PizzaBlock'
import PizzaLoader from '../PizzaLoader'

const Content = () => {
  const dispatch = useDispatch()
  const { pizzas } = useSelector((state) => state.pizzaReducer)
  const { sortFilter } = useSelector((state) => state.filtersReducer)
  const { currentCategoryId } = useSelector((state) => state.filtersReducer)

  const [isLoading, setIsLoading] = React.useState(false)

  const { cartPizzas } = useSelector((state) => state.cartReducer)

  React.useEffect(() => {
    setIsLoading(true)
    axios
      .get(
        `/pizzas${
          currentCategoryId !== null ? `?category=${currentCategoryId}&` : '?'
        }_sort=${sortFilter.type}&_order=${sortFilter.order}`
      )
      .then(({ data }) => {
        dispatch(setPizzas(data))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [sortFilter, currentCategoryId, dispatch])

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categories={[
              { id: 1, name: 'Мясные' },
              { id: 2, name: 'Вегетарианская' },
              { id: 3, name: 'Гриль' },
              { id: 4, name: 'Острые' },
              { id: 5, name: 'Закрытые' },
            ]}
          />
          <SortPopup />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? Array(9)
                .fill(0)
                .map((elem, index) => <PizzaLoader key={elem + index} />)
            : pizzas.length &&
              pizzas.map((pizza) => (
                <PizzaBlock
                  addedPizzas={cartPizzas}
                  key={pizza.id}
                  {...pizza}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

export default Content
