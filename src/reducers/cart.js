const initialState = {
  cartPizzas: [],
  pizzaInfo: {
    totalPrice: 0,
    totalCount: 0,
  },
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PIZZA_TO_CART':
      return {
        ...state,
        cartPizzas: action.payload,
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cartPizzas: [],
      }
    case 'COUNT_TOTAL_PRICE_AND_TOTAL_COUNT':
      return {
        ...state,
        pizzaInfo: action.payload,
      }
    case 'CLEAR_TOTAL_PRICE_AND_TOTAL_COUNT':
      return {
        ...state,
        pizzaInfo: {
          totalPrice: 0,
          totalCount: 0,
        },
      }
    default:
      return state
  }
}
