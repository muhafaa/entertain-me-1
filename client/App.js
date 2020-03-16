import React, { useEffect } from 'react'
import { AppRegistry } from 'react-native'
import Navigation from './src/navigations/Navigation'
import { Provider as StoreProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'

import * as Font from 'expo-font'
import { Provider as AntDesignProvider } from '@ant-design/react-native'

import client from './gqlClient'

import store from './src/store'

export default function App() {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync(
        'antoutline',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antoutline.ttf')
      )

      await Font.loadAsync(
        'antfill',
        // eslint-disable-next-line
        require('@ant-design/icons-react-native/fonts/antfill.ttf')
      )
    }
    loadFont()
  }, [])

  return (
    <StoreProvider store={store}>
      <ApolloProvider client={client}>
        <AntDesignProvider>
          <Navigation />
        </AntDesignProvider>
      </ApolloProvider>
    </StoreProvider>
  )
}

AppRegistry.registerComponent('main', () => Main)
