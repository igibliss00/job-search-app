import React, { useState, useEffect } from 'react'
import { createAppContainer  } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Notifications } from 'expo';

import WelcomeScreen from './src/screens/WelcomeScreen'
import AuthScreen from './src/screens/AuthScreen'
import DeckScreen from './src/screens/DeckScreen'
import MapScreen from './src/screens/MapScreen'
import ReviewScreen from './src/screens/ReviewScreen'
import SettingsScreen from './src/screens/SettingsScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Provider as JobProvider } from './src/context/JobContext'
import { setNavigator } from './src/navigationRef'
import registerForNotifications from './src/services/push_notifications'

const MainNavigator = createBottomTabNavigator({
  Welcome: { 
    screen: WelcomeScreen,
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
}, {
  defaultNavigationOptions: {
      tabBarVisible: false
    }
  } 
)

MainNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
  tabBarVisible: false
};

const App = createAppContainer(MainNavigator) 

export default () => {
  const [notification, setNotification] = useState()

  useEffect(() => {
    registerForNotifications()
    const notificationSubscription = Notifications.addListener(_handleNotification)
  }, [])

  const _handleNotification = e => {
    const { data: { text }, origin } = notification
    if (origin === 'received' && text) {
      Alert.alert(
        "new Push Notification",
        text,
        [{ text: 'Ok.'}]
      )
    }
    setNotification(e)
  }

  return (
    <JobProvider>
      <AuthProvider>
        <App ref={navigator => setNavigator(navigator)}/>
      </AuthProvider>
    </JobProvider>
  )
}


