import React from 'react'
import { Text } from 'react-native'
import { Card } from '@ant-design/react-native'

import s from '../../styles'

const Tag = (props) => {
  return (
    <Card style={[s.tengahin, { padding: 5, backgroundColor: '#7f8000' }]}>
      <Text style={{ color: 'white' }}>{props.tag}</Text>
    </Card>
  )
}

export default Tag
