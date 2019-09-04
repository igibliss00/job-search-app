import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import { FB_TOKEN } from '../constants'

const AuthScreen = ({ navigation }) => {
    const { 
        state: { token },        
        facebookLogin 
    } = useContext(AuthContext)

    useEffect(() => {
        facebookLogin()
        onAuthComplete(token)
    }, [])

    const onAuthComplete = token => {
        if (token) {
            navigation.navigate('Map')
        }
    }
    return (
        <View>
            <Text>Auth Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({})

export default React.memo(AuthScreen)