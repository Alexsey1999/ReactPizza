export const setPizzaToCart = (payload) => ({
  type: 'ADD_PIZZA_TO_CART',
  payload,
})

export const setTotalPriceAndTotalCount = (payload) => ({
  type: 'COUNT_TOTAL_PRICE_AND_TOTAL_COUNT',
  payload,
})

export const clearTotalPriceAndTotalCount = () => ({
  type: 'CLEAR_TOTAL_PRICE_AND_TOTAL_COUNT',
})

export const setClearCart = () => ({
  type: 'CLEAR_CART',
})
