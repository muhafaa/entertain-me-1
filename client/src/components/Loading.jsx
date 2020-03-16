import React from 'react'
import { View } from 'react-native'
import { Card, ActivityIndicator } from '@ant-design/react-native'
import s from '../../styles'

const Loading = () => {
  return (
    <View style={[s.flex, s.tengahin, s.hFull]}>
      <Card style={{ padding: '5%', backgroundColor: '#263c0a80' }}>
        <ActivityIndicator color="blue" size="large" text="Please Wait..." />
      </Card>
    </View>
  )
}

export default Loading
