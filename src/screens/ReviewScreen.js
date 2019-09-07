import React, { useContext } from 'react'
import { View, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { Button, Card } from 'react-native-elements'

import { Context as JobContext } from '../context/JobContext'

const ReviewScreen = () => {
    const {
        state: { likedJobs }
    } = useContext(JobContext)
    console.log("likedJobs", likedJobs) 

    const renderLikedJobs = () => {
        return likedJobs.map(({ id, name, phone, price, rating, review_count }) => {
            return (
                <Card key={id}>
                    <View style={{ height: 200 }} >
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{name}</Text>
                            <Text style={styles.italics}>{phone}</Text>
                            <Text style={styles.italics}>{price}</Text>
                            <Text style={styles.italics}>{rating}</Text>
                            <Text style={styles.italics}>{review_count}</Text>
                        </View>
                    </View>
                </Card>
            )
        }) 
    }
    return (
        <ScrollView style={styles.container}>
            {renderLikedJobs()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

ReviewScreen.navigationOptions = ({ navigation }) => ({
    title: "Review Jobs",
    headerRight: (
        <Button 
            title="Settings" 
            onPress={() => navigation.navigate('Settings')}
            titleStyle={{
                color: "rgba(0, 122, 255, 1)"
            }}
            type="clear"
        />
    ),
    style: {
        marginTop: Platform.OX === 'android' ? 24 : 0,
        detailWrapper: {
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        italics: {
            fontStyle: 'italic', 
        },
    }
})  

export default ReviewScreen