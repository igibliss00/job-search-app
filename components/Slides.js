import React from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

const Slides = ({ data }) => {
    const renderSlides = () => {        
        return data.map(slide => {
            return (
                <View 
                    key={slide.text}
                    style={styles.slideStyle}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                </View>
            )
        })
    }
    return (
        <ScrollView
            horizontal
            style={{ height: '100%' }}
        >
            {renderSlides()}
        </ScrollView> 
    )
}

const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30
    }
})

export default Slides