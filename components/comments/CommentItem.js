import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CommentItem = ({ comment }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png' }}
                style={styles.image} />
            <View style={styles.innerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textUsername}>{comment.username}</Text>
                    <Text style={styles.textComment}> {comment.comment}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{comment.timePosted}h</Text>
                    <Text style={styles.text}>     {comment.likes} likes</Text>
                </View>

            </View>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/heart_outline.png')}
                    style={styles.likeImage} />
            </TouchableOpacity>

        </View>
    )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    innerContainer: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    textContainer: {
        flexDirection: 'row'
    },
    likeImage: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginTop: 10
    },
    textUsername: {
        color: 'white',
        fontWeight: 'bold'
    },
    textComment: {
        color: 'white',
        fontWeight: '300'
    },
    text: {
        color: 'white',
        marginTop: 5,
        fontWeight: '200'
    }
})