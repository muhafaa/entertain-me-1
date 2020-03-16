import React, { useEffect } from 'react'
import { AppRegistry } from 'react-native'
import Navigation from './src/navigations/Navigation'
import { Provider as StoreProvider } from 'react-redux'
import { ApolloProvider } from '@apollo/react-hooks'

import { Provider as AntDesignProvider } from '@ant-design/react-native'

import client from './gqlClient'

import store from './src/store'

export default function App() {
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
