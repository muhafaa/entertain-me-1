import React, { useState } from 'react'
import { Text } from 'react-native'

import { TabBar } from '@ant-design/react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'

import MovieScreen from './MovieScreen'
import TvShow from './TvShow'

const HomeScreen = (props) => {
  const [selectedTab, setSelectedTab] = useState('Movie')

  return (
    <>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#263c0a80"
      >
        <TabBar.Item
          title="Movie"
          icon={<MaterialIcons name="movie" size={30} color="white" />}
          selected={selectedTab === 'Movie'}
          onPress={() => setSelectedTab('Movie')}
        >
          <MovieScreen />
        </TabBar.Item>
        <TabBar.Item
          title="TV Show"
          icon={<FontAwesome name="tv" size={30} color="white" />}
          selected={selectedTab === 'TvShow'}
          onPress={() => setSelectedTab('TvShow')}
        >
          <TvShow />
        </TabBar.Item>
      </TabBar>
      <ActionButton
        buttonColor="#2ab3ff"
        position="center"
        offsetY={20}
        onPress={() => {
          props.navigation.navigate('AddMovie')
        }}
      />
    </>
  )
}

export default HomeScreen
