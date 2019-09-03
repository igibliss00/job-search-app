import React from 'react'
import { View, StyleSheet } from 'react-native'

import Slides from '../src/components/Slides'

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03A9F4'},
    { text: 'Use this to get a job', color: '#009688'},
    { text: 'Set your location, then swipe away', color: '#03A9F4'}
]

const WelsomeScreen = ({ navigation }) => {
    const onSlideComplete = () => {
        navigation.navigate('Auth')
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

const styles = StyleSheet.create({})

export default WelsomeScreen