import React from 'react'
import { createAppContainer  } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './src/screens/WelcomeScreen'
import AuthScreen from './src/screens/AuthScreen'
import DeckScreen from './src/screens/DeckScreen'
import MapScreen from './src/screens/MapScreen'
import ReviewScreen from './src/screens/ReviewScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as JobProvider } from './src/context/JobContext'
import { setNavigator } from './src/navigationRef'

const MainNavigator = createBottomTabNavigator({
  Welcome: { 
    screen: WelcomeScreen
  },
  Auth: {
    screen: AuthScreen 
  },
  Main: {
    screen: createBottomTabNavigator({
      Map: {
        screen: MapScreen
      },
      Deck: {
        screen: DeckScreen
      },
      Review: {
        screen: createStackNavigator({
          Review: {
            screen: ReviewScreen,
          },
          Settings: SettingsScreen
        })
      }
    })
  } 
})

const App = createAppContainer(MainNavigator) 

export default () => {
  return (
    <JobProvider>
      <AuthProvider>
        <App ref={navigator => setNavigator(navigator)}/>
      </AuthProvider>
    </JobProvider>
  )
}


