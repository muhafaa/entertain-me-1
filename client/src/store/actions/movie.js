export const FETCH_MOVIE_LIST = ({ loading, error, data }) => {
  if (loading) {
    return {
      type: 'FETCH_LOADING'
    }
  }
  if (error) {
    console.log(error)
    return {
      type: 'FETCH_ERROR'
    }
  } else if (data) {
    return {
      type: 'FETCH_MOVIE_LIST',
      payload: {
        movieList: data.movies
      }
    }
  }
}
