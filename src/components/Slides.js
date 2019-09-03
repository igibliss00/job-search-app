import React from 'react'
import { 
    View, 
    Text, 
    ScrollView, 
    StyleSheet,
    Dimensions
} from 'react-native'
import { Button } from 'react-native-elements'

const SCREEN_WIDTH = Dimensions.get('window').width

const Slides = ({ data }) => {

    const renderLastSlide = index => {
        if (index === data.length - 1) {
            return  (
                <Button
                    title="Onward!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    containerStyle={{ marginTop: 15 }}
                />
            )
        }
    }

    const renderSlides = () => {        
        return data.map((slide, index) => {
            return (
                <View 
                    key={slide.text}
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {renderLastSlide(index)}
                </View>
            )
        })
    }

    return (
        <ScrollView
            horizontal
            style={{ height: '100%' }}
            pagingEnabled
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
        width: SCREEN_WIDTH,
        padding: 10
    },
    textStyle: {
        fontSize: 30,
        color: 'white'
    },
    buttonStyle: {
        backgroundColor: '#0288D1'
    }
})

export default Slides