import React from 'react'
import { View, StyleSheet } from 'react-native'

import Slides from '../components/Slides'

const SLIDE_DATA = [
    { text: 'Welcome to JobApp'},
    { text: 'Use this to get a job'},
    { text: 'Set your location, then swipe away'}
]

const WelsomeScreen = () => {
    return (
        <View>
            <Slides data={SLIDE_DATA}  />
        </View>
    )
}

const styles = StyleSheet.create({})

export default WelsomeScreen