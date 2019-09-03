import { createAppContainer  } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from './screens/WelcomeScreen'
import AuthScreen from './screens/AuthScreen'
import DeckScreen from './screens/DeckScreen'
import MapScreen from './screens/MapScreen'
import ReviewScreen from './screens/ReviewScreen'
import SettingsScreen from './screens/SettingsScreen'

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

export default createAppContainer(MainNavigator) 


