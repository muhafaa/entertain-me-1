const initialState = {
  movieList: [],
  loadingMovie: true
}

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MOVIE_LIST':
      console.log(action.payload)
      return {
        ...state,
        movieList: action.payload.movieList,
        loadingMovie: false
      }

    case 'FETCH_ERROR':
      return { ...state, loadingMovie: false }

    case 'FETCH_LOADING':
      return { ...state, loadingMovie: true }

    default:
      return state
  }
}

export default movieReducer
