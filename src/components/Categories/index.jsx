import React from 'react'
import classNames from 'classnames'
import { setCategoryId } from '../../actions/filters'
import { useSelector, useDispatch } from 'react-redux'

const Categories = React.memo(({ categories }) => {
  const { currentCategoryId } = useSelector((state) => state.filtersReducer)
  const dispatch = useDispatch()

  const chooseCategory = (categoryId) => {
    dispatch(setCategoryId(categoryId))
  }

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => chooseCategory(null)}
          className={classNames({ active: currentCategoryId === null })}
        >
          Все
        </li>
        {categories &&
          categories.map((category) => (
            <li
              className={classNames({
                active: category.id === currentCategoryId,
              })}
              onClick={() => chooseCategory(category.id)}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  )
})

export default Categories
