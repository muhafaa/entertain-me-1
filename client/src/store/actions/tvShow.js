export const FETCH_TVSHOW_LIST = ({ loading, error, data }) => {
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
      type: 'FETCH_TVSHOW_LIST',
      payload: {
        tvShowList: data.tvShows
      }
    }
  }
}
