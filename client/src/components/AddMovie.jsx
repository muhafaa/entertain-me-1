import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import { Card, WhiteSpace, Button } from '@ant-design/react-native'
import s from '../../styles'

import RadioForm from 'react-native-simple-radio-button'
import Tag from './Tag'

const ADD_MOVIE = gql`
  mutation {
    addMovie(
      title: "title2"
      overview: "overview2"
      poster_path: "ww2.ww2.com"
      popularity: 5.99
      tags: ["tag2", "tag2"]
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const ADD_TV_SHOW = gql`
  mutation {
    addTvShow(
      title: "title2"
      overview: "overview2"
      poster_path: "ww2.ww2.com"
      popularity: 5.99
      tags: ["tag2", "tag2"]
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

const AddMovie = () => {
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

  const submit = () => {
    console.log(typeof popularity)
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
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
                  {tags.map((tag) => {
                    return <Tag tag={tag} key={tag} />
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
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AddMovie
