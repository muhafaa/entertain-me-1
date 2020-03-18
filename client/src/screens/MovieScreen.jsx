import React, { useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { WhiteSpace } from '@ant-design/react-native'
import s from '../../styles'

import Loading from '../components/Loading'
import MovieCard from '../components/MovieCard'

import { FETCH_MOVIE_LIST } from '../store/actions/movie'
import { FlatList } from 'react-native-gesture-handler'

const GET_MOVIE_LIST = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

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
                  {movies.map((movie, i) => {
                    return <MovieCard item={movie} key={movie._id} />
                  })}
                  <FlatList
                    data={movies}
                    renderItem={({ item }) => {
                      return <MovieCard item={item} key={item._id} />
                    }}
                  />
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

export default MovieScreen
