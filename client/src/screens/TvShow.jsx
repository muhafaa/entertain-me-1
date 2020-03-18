import React, { useEffect } from 'react'
import { Text, View, ScrollView, Image } from 'react-native'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { WhiteSpace } from '@ant-design/react-native'
import s from '../../styles'

import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

import { FETCH_TVSHOW_LIST } from '../store/actions/tvShow'

const GET_TVSHOW_LIST = gql`
  {
    tvShows {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const TvShowScreen = () => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(GET_TVSHOW_LIST)

  const loadingTvShow = useSelector(
    (state) => state.tvShowReducer.loadingTvShow
  )
  const TvShows = useSelector((state) => state.tvShowReducer.tvShowList)

  useEffect(() => {
    setTimeout(() => {
      dispatch(FETCH_TVSHOW_LIST({ loading, error, data }))
    }, 1000)
  }, [data, TvShows])

  return (
    <View>
      {(() => {
        if (loadingTvShow) {
          return <Loading />
        } else {
          return (
            <View>
              <ScrollView>
                <WhiteSpace />
                <View
                  style={[
                    {
                      justifyContent: 'center'
                    },
                    s.wFull
                  ]}
                >
                  {TvShows.map((tvShow, i) => {
                    return <MovieCard item={tvShow} key={tvShow._id} />
                  })}
                  {TvShows.map((tvShow, i) => {
                    return <MovieCard item={tvShow} key={tvShow._id} />
                  })}
                  {TvShows.map((tvShow, i) => {
                    return <MovieCard item={tvShow} key={tvShow._id} />
                  })}
                  {TvShows.map((tvShow, i) => {
                    return <MovieCard item={tvShow} key={tvShow._id} />
                  })}
                </View>
                <WhiteSpace />
              </ScrollView>
            </View>
          )
        }
      })()}
    </View>
  )
}

export default TvShowScreen
