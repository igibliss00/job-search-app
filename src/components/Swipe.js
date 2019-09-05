import React, { useState, useEffect } from 'react'
import { 
    View, 
    StyleSheet, 
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager, 
} from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

const Swipe = ({ 
    data, 
    renderCard,
    onSwipeLeft,
    onSwipeRight,
    renderNoMoreCards,
}) => {
    const [index, setIndex] = useState(0)
    const [position] = useState(new Animated.ValueXY())

    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring()
    }, [])

    useEffect(() => {
        setIndex(0)
    }, [data])

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) =>{
            position.setValue({ x: gesture.dx, y: gesture.dy })
        },
        onPanResponderRelease: (event, gesture) => {
            if (gesture.dx > SWIPE_THRESHOLD) {
                forceSwipe('right')
            } else if (gesture.dx < -SWIPE_THRESHOLD) {
                forceSwipe('left')
            } else {
                resetPosition()
            }
        },
    })

    const forceSwipe = direction => {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => onSwipeComplete(direction))
    }

    const onSwipeComplete = direction => {
        const item = data[index]
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)
        position.setValue({ x: 0, y: 0 })
        setIndex(index + 1)
    }

    const resetPosition = () => {
        Animated.spring(position,  {
            toValue: { x: 0, y: 0 }
        }).start()
    }

    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
            outputRange: ['-120deg', '0deg', '120deg']
        })
        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    const renderCards = (data, renderCard) => {
        if (index >= data.length) {
            return renderNoMoreCards()
        }
        return data && data.state.map((item, i) => {
            if (i < index) return null
            if (i === index) {
                return (
                    <Animated.View
                        key={item.id}
                        {...panResponder.panHandlers}
                        style={[getCardStyle(), styles.cardStyle, { zIndex: 1 }]}
                    >
                        {renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View 
                    style={[styles.cardStyle, { top: 10 * (i - index) }]}
                    key={item.id}
                >
                    {renderCard(item)}
                </Animated.View>
            )
        }).reverse() 
    }

    return renderCards(data, renderCard)
} 

Swipe.defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
        zIndex: 0,
    }
})

export default Swipe



// async forceSwipe(direction) {
//     const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
//     await Animated.timing(this.position, {
//       toValue: { x, y: 0 },
//       duration: SWIPE_OUT_DURATION,
//     }).start();
//     this.onSwipeCompletion(direction);
// }