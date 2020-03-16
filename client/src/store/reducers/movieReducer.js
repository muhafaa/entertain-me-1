const initialState = {
  movieList: []
}

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_MOVIE_LIST':
      console.log(action.payload.movieList)
      return { ...state, movieList: action.payload.movieList }

    default:
      return state
  }
}

export default movieReducer
