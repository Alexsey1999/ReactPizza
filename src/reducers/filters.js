const initialState = {
  sortFilter: { type: 'rating', order: 'desc' },
  currentCategoryId: null,
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_SORT_FILTER':
      return {
        ...state,
        sortFilter: action.payload,
      }
    case 'SET_CATEGORY_ID':
      return {
        ...state,
        currentCategoryId: action.payload,
      }
    default:
      return state
  }
}
