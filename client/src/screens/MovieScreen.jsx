import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { WhiteSpace } from '@ant-design/react-native'

import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

import { FETCH_MOVIE_LIST } from '../store/actions/movie'
import { FlatList } from 'react-native-gesture-handler'

import { GET_MOVIE_LIST } from '../queries/movie'

const MovieScreen = () => {
  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(GET_MOVIE_LIST)

  const loadingMovie = useSelector((state) => state.movieReducer.loadingMovie)
  const movies = useSelector((state) => state.movieReducer.movieList)

  useEffect(() => {
    setTimeout(() => {
      dispatch(FETCH_MOVIE_LIST({ loading, error, data }))
    }, 1000)
  }, [data])

  return (
    <View>
      {(() => {
        if (loadingMovie) {
          return <Loading />
        } else {
          return (
            <View>
              <WhiteSpace />
              <FlatList
                data={movies}
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

export default MovieScreen
