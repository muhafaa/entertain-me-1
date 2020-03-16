import { combineReducers } from 'redux'

import movieReducer from './movieReducer'
import tvShowReducer from './tvShowReducer'

const reducer = combineReducers({
  movieReducer,
  tvShowReducer
})

export default reducer
