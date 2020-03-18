import React from 'react'
import { Text, Image, ScrollView } from 'react-native'
import { Grid, Col } from 'react-native-easy-grid'
import { Card } from '@ant-design/react-native'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import s from '../../styles'

import Tag from './Tag'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MovieCard = (props) => {
  // console.log(props)
  const navigation = useNavigation()
  return (
    <Card
      style={[
        {
          margin: 5
        },
        s.shadowMd
      ]}
      key={props.item._id}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('MovieDetail', {
            movieId: props.item._id,
            category: props.item.__typename
          })
        }
      >
        <Grid style={{ margin: 5 }}>
          <Col style={s.tengahin}>
            <Image
              style={s.tengahin}
              source={{
                uri: props.item.poster_path
              }}
              resizeMode="contain"
              style={{ width: 100, height: 100 }}
            />
          </Col>
          <Col style={{ justifyContent: 'center' }}>
            <Text style={[s.small]}>{props.item.title}</Text>
            <Text>
              {props.item.popularity + ' '}
              <AntDesign name="star" color="#7f8000" />
            </Text>
            <ScrollView horizontal={true} style={{ marginVertical: 3 }}>
              {props.item.tags.map((tag) => {
                return <Tag tag={tag} key={tag} />
              })}
            </ScrollView>
          </Col>
        </Grid>
      </TouchableOpacity>
    </Card>
  )
}

export default MovieCard
