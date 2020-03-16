import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Grid, Col } from 'react-native-easy-grid'
import { Card } from '@ant-design/react-native'
import { AntDesign } from '@expo/vector-icons'

import s from '../../styles'

import Tag from './Tag'

const MovieCard = (props) => {
  /* 
     title
      overview
      poster_path
      popularity
      tags */
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
    </Card>
  )
}

export default MovieCard
