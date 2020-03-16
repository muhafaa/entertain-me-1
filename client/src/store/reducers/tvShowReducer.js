const initialState = {
  tvShowList: [],
  loadingTvShow: true
}

function tvShowReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TVSHOW_LIST':
      return {
        ...state,
        tvShowList: action.payload.tvShowList,
        loadingTvShow: false
      }

    case 'FETCH_ERROR':
      return { ...state, loadingTvShow: false }

    case 'FETCH_LOADING':
      return { ...state, loadingTvShow: true }

    default:
      return state
  }
}

export default tvShowReducer
