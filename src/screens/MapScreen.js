import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Button, Input } from 'react-native-elements'

import { Context as JobContext } from '../context/JobContext'

const MapScreen = ({ navigation }) => {
    const [region, setRegion] = useState({
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
    })

    const [searchTerm, setSearchTerm] = useState('')

    const {        
        fetchJobs 
    } = useContext(JobContext)

    const onRegionChangeComplete = newRegion => {
        setRegion(newRegion)
    }

    const onButtonPress = () => {
        fetchJobs(region, searchTerm, () => {
            navigation.navigate('Deck')
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView 
                style={{ flex: 1 }} 
                region={region}
                onRegionChangeComplete={onRegionChangeComplete}
            />
            <View style={styles.buttonContainer}>
                <Input 
                    placeholder='Search Term'
                    containerStyle={styles.input}
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                />
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
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 3,
    }
})

export default React.memo(MapScreen)

