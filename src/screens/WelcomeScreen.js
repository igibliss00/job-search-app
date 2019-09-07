import React, { useState, useEffect } from 'react'
import { 
    View, 
    StyleSheet, 
    ActivityIndicator,
    Platform,
    AsyncStorage 
} from 'react-native'
import { AppLoading } from 'expo'
import { FB_TOKEN  } from "../constants";

import Slides from '../components/Slides'

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4'},
    { text: 'Use this to get a job', color: '#009688'},
    { text: 'Set your location, then swipe away', color: '#03A9F4'}
]

const WelcomeScreen = ({ navigation }) => {
    const [ token, setToken ] = useState(null)
    const getToken = async () => {
        setToken(await AsyncStorage.getItem(FB_TOKEN))
    }
    useEffect(() => {
        getToken() 
        if (token) {
            navigation.navigate('Map')
        } else {
            setToken(false)
        }
    }, [])

    const onSlideComplete = () => {
        navigation.navigate('Auth')
    }
    if ((token === null) && Platform.OS === 'ios') {        
        navigation.navigate('Map')
        
        // return (
        //     <View style={styles.loading}>
        //         <AppLoading />
        //     </View>
        // )
    } else if((token === null) && Platform.OS === 'android') {
        return  <ActivityIndicator size='large'/>           
    }
    return (
        <View>
            <Slides 
                data={SLIDE_DATA}  
                onComplete={onSlideComplete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        // alignContent: 'center',
    }
})

WelcomeScreen.navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    
})
    

export default WelcomeScreen