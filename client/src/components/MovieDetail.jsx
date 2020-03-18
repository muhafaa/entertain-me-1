import React from 'react'
import { View, Text, Image, Alert, ToastAndroid } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Grid, Col } from 'react-native-easy-grid'

import s from '../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Button } from '@ant-design/react-native'
import { Entypo } from '@expo/vector-icons'
import Tag from './Tag'

import { GET_MOVIE_LIST } from '../queries/movie'
import { GET_TVSHOW_LIST } from '../queries/tvShow'

import { useMutation } from '@apollo/react-hooks'
import { DELETE_MOVIE } from '../mutations/movie'
import { DELETE_TV_SHOW } from '../mutations/tvShow'

const MovieDetail = (props) => {
  //   console.log(props)
  const { goBack, navigate } = useNavigation()
  const [deleteMovie, { data: delMovieResponse }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: GET_MOVIE_LIST }]
  })
  const [deleteTvShow, { data: delTvShowResponse }] = useMutation(
    DELETE_TV_SHOW,
    {
      refetchQueries: [{ query: GET_TVSHOW_LIST }]
    }
  )

  let movie = useSelector((state) => {
    if (props.route.params.category === 'Movie') {
      return state.movieReducer.movieList.find((movie) => {
        return movie._id === props.route.params.movieId
      })
    }
    return state.tvShowReducer.tvShowList.find((tvShow) => {
      return tvShow._id === props.route.params.movieId
    })
  })

  return (
    <ScrollView>
      {(() => {
        if (movie) {
          return (
            <Card style={{ margin: 10 }}>
              <Text
                style={[
                  s.fontBold,
                  s.large,
                  { textAlign: 'center', marginVertical: 5 }
                ]}
              >
                {movie.title}
              </Text>
              <Grid style={{ margin: 10 }}>
                <Col>
                  <View>
                    <Card
                      style={{ marginRight: 10, backgroundColor: '#77820088' }}
                    >
                      <Card.Header
                        title="Popularity"
                        style={[s.tengahin, s.flex]}
                      />
                      <Card.Body>
                        <Text style={[s.textCenter, s.medium]}>
                          <Entypo name="star" color="#7f8000" size={20} />
                          {' ' + movie.popularity}
                        </Text>
                      </Card.Body>
                    </Card>
                    <Card
                      style={{
                        marginRight: 10,
                        backgroundColor: '#77820088',
                        marginTop: 5
                      }}
                    >
                      <Card.Header title="Tags" />
                      <Card.Body
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center'
                        }}
                      >
                        {movie.tags.map((tag) => {
                          return <Tag tag={tag} key={tag} />
                        })}
                      </Card.Body>
                    </Card>
                  </View>
                </Col>
                <Col style={{ marginHorizontal: 10 }}>
                  <Image
                    style={[s.tengahin, { width: 250, height: 250 }]}
                    source={{
                      uri: movie.poster_path
                    }}
                    resizeMode="contain"
                  />
                  <View
                    style={[
                      s.flex,
                      s.flexRow,
                      s.justifyEvenly,
                      { marginTop: 10 }
                    ]}
                  >
                    <Button
                      type="warning"
                      onPress={() => {
                        const category = props.route.params.category
                        let confirmTitle =
                          category === 'Movie' ? 'movie' : 'tv show'

                        console.log(category)
                        Alert.alert(
                          `Delete this ${confirmTitle}?`,
                          `It will delete this ${confirmTitle}`,
                          [
                            {
                              text: 'OK',
                              onPress: () => {
                                if (category === 'Movie') {
                                  deleteMovie({
                                    variables: {
                                      id: movie._id
                                    }
                                  })
                                    .then((res) => {
                                      console.log(res)
                                      goBack()
                                      ToastAndroid.show(
                                        `${category} deleted`,
                                        ToastAndroid.SHORT
                                      )
                                    })
                                    .catch((err) => {
                                      console.log(err)
                                      ToastAndroid.show(
                                        'Internal Error',
                                        ToastAndroid.SHORT
                                      )
                                    })
                                } else {
                                  deleteTvShow({
                                    variables: {
                                      id: movie._id
                                    }
                                  })
                                    .then((res) => {
                                      console.log(res)
                                      goBack()
                                      ToastAndroid.show(
                                        `${category} deleted`,
                                        ToastAndroid.SHORT
                                      )
                                    })
                                    .catch((err) => {
                                      console.log(err)
                                      ToastAndroid.show(
                                        'Internal Error',
                                        ToastAndroid.SHORT
                                      )
                                    })
                                }
                              }
                            },
                            {
                              text: 'Cancel',
                              style: 'cancel'
                            }
                          ],
                          { cancelable: false }
                        )
                      }}
                    >
                      <Entypo name="trash" size={25} />
                    </Button>
                    <Button
                      type="primary"
                      onPress={() => {
                        navigate('AddMovie', {
                          category: props.route.params.category,
                          movieId: movie._id
                        })
                      }}
                    >
                      <Entypo name="edit" size={25} />
                    </Button>
                  </View>
                </Col>
              </Grid>
              <Card style={{ marginHorizontal: 5 }}>
                <Text
                  style={[
                    s.medium,
                    {
                      borderBottomWidth: 1,
                      borderBottomColor: '#65a500',
                      margin: 10
                    }
                  ]}
                >
                  Overview
                </Text>
                <Text style={{ marginHorizontal: 10, textAlign: 'justify' }}>
                  {movie.overview}
                </Text>
              </Card>
            </Card>
          )
        }
      })()}
    </ScrollView>
  )
}

export default MovieDetail
