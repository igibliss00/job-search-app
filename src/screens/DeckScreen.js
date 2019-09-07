import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Card, Button } from 'react-native-elements'

import { Context as JobContext } from '../context/JobContext'
import Swipe from '../components/Swipe'

const DeckScreen = () => {
    const { 
        state: { jobs },
        likeJob 
    } = useContext(JobContext)
    // console.log("state:", jobs)
    const renderCard = ({ 
        coordinates, 
        name,
        display_phone,
     }) => {
        const initialRegion = {
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02
        }
        return (
            <Card title={name}>
                <View style={{ height: 400}}>
                    <MapView
                        scrollEnabled={false} //disables the map scroll so that the card can be swiped
                        style={{ flex: 1 }}
                        cacheEnabled={true} //renders as an image for a better performance, especially better for android
                        initialRegion={initialRegion}
                    >
                    </MapView>
                </View>
                <View style={styles.detailWrapper}>
                    <Text>{name}</Text>
                    <Text>{display_phone}</Text>
                </View>
            </Card>
        )
    }

    const renderNoMoreCards = () => {
        return (
            <Card title="No More Cards">
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            <Swipe
                data={jobs}
                renderCard={renderCard}
                renderNoMoreCards={renderNoMoreCards}
                onSwipeRight={job => likeJob(job)}
            >
            </Swipe>
        </View>
    )
}

const styles = StyleSheet.create({
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    container: {
        marginTop: 20
    }
})

export default DeckScreen