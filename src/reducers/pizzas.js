const initialState = {
  pizzas: [],
}

export default function pizzasReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_PIZZAS':
      return {
        ...state,
        pizzas: action.payload,
      }
    default:
      return state
  }
}
