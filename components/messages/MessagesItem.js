import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'

const MessagesItem = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png' }}
                style={styles.image} />
            <View style={styles.textContainer}>
                <View style={styles.messageHeader}>
                    <Text style={styles.name}>My name</Text>
                    <Text style={styles.text}>11:11</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>This is a message!</Text>
            </View>
        </View>
    )
}

export default MessagesItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        color: 'white',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 18,
        color: 'pink',
        fontWeight: 'bold',
        marginBottom: 3
    }
})