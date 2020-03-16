import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { gql } from 'apollo-boost'
// import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

import { Button, Toast } from '@ant-design/react-native'

import { GET_MOVIE_LIST } from '../store/actions/movie'

const MOVIE = gql`
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

const Homepage = () => {
  // const dispatch = useDispatch()
  const { loading, error, data } = useQuery(MOVIE)

  if (error) {
    console.log(error)
  } else {
    console.log(data)
  }

  return (
    <View style={{ marginTop: '10%' }}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={() => Toast.info('This is a toast tips')}>Start</Button>
    </View>
  )
}

export default Homepage
