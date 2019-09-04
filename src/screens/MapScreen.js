import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Button } from 'react-native-elements'

import { Context as JobContext } from '../context/JobContext'

const MapScreen = () => {
    const [region, setRegion] = useState({
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    })

    const {        
        fetchJobs 
    } = useContext(JobContext)

    const onRegionChangeComplete = newRegion => {
        setRegion(newRegion)
    }

    const onButtonPress = () => {
        console.log(region)
        fetchJobs(region)
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView 
                style={{ flex: 1 }} 
                region={region}
                onRegionChangeComplete={onRegionChangeComplete}
            />
            <View style={styles.buttonContainer}>
                <Button 
                    title="Search This Area"
                    large
                    backgroundColor="#009688"
                    icon={{ name: 'search'}}
                    onPress={onButtonPress}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        margin: 10, 
    }
})

export default React.memo(MapScreen)

