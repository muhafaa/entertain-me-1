import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Card, WhiteSpace, Button } from '@ant-design/react-native'
import s from '../../styles'

import RadioForm from 'react-native-simple-radio-button'
import Tag from './Tag'

import { GET_MOVIE_LIST } from '../queries/movie'
import { GET_TVSHOW_LIST } from '../queries/tvShow'

import { useMutation } from '@apollo/react-hooks'
import { ADD_MOVIE } from '../mutations/movie'
import { ADD_TV_SHOW } from '../mutations/tvShow'

const AddMovie = () => {
  const { goBack } = useNavigation()
  const radioOpts = [
    { label: 'Movie', value: 'movie' },
    { label: 'TV Show', value: 'tvShow' }
  ]
  const [opt, setOpt] = useState('movie')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [popularity, setPopularity] = useState('')
  const [poster, setPoster] = useState('')

  const [addMovie, { data: addMovieResult }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: GET_MOVIE_LIST }]
  })
  const [addTvShow, { data: addTvShowResult }] = useMutation(ADD_TV_SHOW, {
    refetchQueries: [{ query: GET_TVSHOW_LIST }]
  })

  const submit = () => {
    if (opt === 'movie') {
      addMovie({
        variables: {
          title: title,
          overview: overview,
          poster_path: poster,
          popularity: parseFloat(popularity),
          tags: tags
        }
      })
        .then((res) => {
          console.log(res)
          goBack()
          ToastAndroid.show(`New ${opt} has been added`, ToastAndroid.SHORT)
        })
        .catch((err) => {
          console.log(err)
          ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT)
        })
    } else {
      addTvShow({
        variables: {
          title: title,
          overview: overview,
          poster_path: poster,
          popularity: parseFloat(popularity),
          tags: tags
        }
      })
        .then((res) => {
          console.log(res)
          goBack()
          ToastAndroid.show(`New ${opt} has been added`, ToastAndroid.SHORT)
        })
        .catch((err) => {
          console.log(err)
          ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT)
        })
    }
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView enabled={true} behavior="position">
        <Card
          style={{ margin: 10, alignContent: 'center', alignItems: 'center' }}
        >
          <Text style={[s.textCenter, s.mt5, s.large, s.fontBold]}>
            Select Category
          </Text>
          <View style={{ margin: 5 }}>
            <RadioForm
              radio_props={radioOpts}
              formHorizontal={true}
              labelHorizontal={false}
              onPress={(value) => {
                setOpt(value)
              }}
            />
          </View>
        </Card>
        <Card style={[{ margin: 10 }]}>
          <Text style={[s.textCenter, s.mt5, s.large, s.fontBold]}>
            Detail List
          </Text>
          <View style={{ margin: 10 }}>
            <Text>Title :</Text>
            <Card style={[{ marginTop: 5 }]}>
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => {
                  setTitle(text)
                }}
                style={{ marginHorizontal: 5 }}
                multiline={true}
              />
            </Card>
            <WhiteSpace />

            <Text>Overview:</Text>
            <Card style={[{ marginTop: 5 }]}>
              <TextInput
                placeholder="Overview"
                value={overview}
                onChangeText={(text) => {
                  setOverview(text)
                }}
                style={{ marginHorizontal: 5 }}
                multiline={true}
              />
            </Card>

            <View
              style={[
                {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 10
                }
              ]}
            >
              <Text style={{ marginRight: 10 }}>Popularity :</Text>
              <Card>
                <TextInput
                  placeholder="Range from 0.0 to 10.0"
                  value={`${popularity}`}
                  onChangeText={(text) => {
                    setPopularity(text)
                  }}
                  style={[s.textCenter, { marginHorizontal: 5 }]}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </Card>
            </View>

            <Text>Poster Image :</Text>
            <Card style={[{ marginTop: 5 }]}>
              <TextInput
                placeholder="Poster Image Link"
                style={[s.textCenter]}
                value={poster}
                onChangeText={(text) => {
                  setPoster(text)
                }}
              />
            </Card>
            <WhiteSpace />

            <Text>Tags :</Text>
            <Card style={[{ marginTop: 5 }]}>
              <TextInput
                placeholder="You can add one or more tags"
                autoCapitalize="characters"
                style={[s.textCenter, { textTransform: 'uppercase' }]}
                value={tagInput}
                onChangeText={(text) => {
                  setTagInput(text)
                }}
                onSubmitEditing={({ nativeEvent }) => {
                  const { text } = nativeEvent
                  if (!tags.find((tag) => tag === text.toUpperCase())) {
                    setTagInput('')
                    setTags([...tags, text.toUpperCase()])
                  }
                }}
              />
            </Card>

            <Card style={{ marginVertical: 5 }}>
              {tags.length > 0 ? (
                <View
                  style={{
                    margin: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'center',
                    alignContent: 'center'
                  }}
                >
                  {tags.map((tag, i) => {
                    return <Tag tag={tag} key={i} />
                  })}
                </View>
              ) : (
                <Text style={s.textCenter}>Tag List</Text>
              )}
            </Card>

            <Button
              type="primary"
              style={{ marginVertical: 10 }}
              onPress={() => submit()}
            >
              SUBMIT
            </Button>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddMovie
