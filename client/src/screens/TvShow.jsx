import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { WhiteSpace } from '@ant-design/react-native'

import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

import { FETCH_TVSHOW_LIST } from '../store/actions/tvShow'

import { GET_TVSHOW_LIST } from '../queries/tvShow'

const TvShowScreen = () => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(GET_TVSHOW_LIST)

  const loadingTvShow = useSelector(
    (state) => state.tvShowReducer.loadingTvShow
  )
  const tvShows = useSelector((state) => state.tvShowReducer.tvShowList)

  useEffect(() => {
    setTimeout(() => {
      dispatch(FETCH_TVSHOW_LIST({ loading, error, data }))
    }, 1000)
  }, [data, tvShows])

  return (
    <View>
      {(() => {
        if (loadingTvShow) {
          return <Loading />
        } else {
          return (
            <View>
              <WhiteSpace />
              <FlatList
                data={tvShows}
                renderItem={({ item }) => {
                  return <MovieCard item={item} key={item._id} />
                }}
                keyExtractor={(item) => item._id}
              />
              <WhiteSpace />
            </View>
          )
        }
      })()}
    </View>
  )
}

export default TvShowScreen
