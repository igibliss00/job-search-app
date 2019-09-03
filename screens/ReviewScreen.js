import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { Button } from 'react-native-elements'

const ReviewScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ReviewScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

ReviewScreen.navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
        <Button 
            title="Settings" 
            onPress={() => navigation.navigate('Settings')}
            // buttonStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            titleStyle={{
                color: "rgba(0, 122, 255, 1)"
            }}
            type="clear"
        />
    ),
    style: {
        marginTop: Platform.OX === 'android' ? 24 : 0
    }
})  

export default ReviewScreen