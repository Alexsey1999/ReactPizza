import { combineReducers } from 'redux'

import pizzaReducer from './reducers/pizzas'
import filtersReducer from './reducers/filters'
import cartReducer from './reducers/cart'

const rootReducer = combineReducers({
  pizzaReducer,
  filtersReducer,
  cartReducer,
})

export default rootReducer
