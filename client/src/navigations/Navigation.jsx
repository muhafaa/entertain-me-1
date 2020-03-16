import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen'
import AddMovie from '../components/AddMovie'

const Stack = createStackNavigator()

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Entertain Me"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#25410b'
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
        <Stack.Screen
          name="AddMovie"
          component={AddMovie}
          options={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#25410b'
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
