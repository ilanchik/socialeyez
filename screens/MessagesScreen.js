import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'

import MessagesItem from '../components/messages/MessagesItem'

const MessagesScreen = () => {
    return (
        <View style={styles.container}>
            <MessagesItem />
        </View>

    )
}

export default MessagesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    text: {
        fontSize: 30,
        color: 'white'
    }
})