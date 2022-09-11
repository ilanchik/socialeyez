import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth, database } from '../../firebase';
import { child, onValue, push, ref, update } from 'firebase/database';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Schema for comment
const commentSchema = Yup.object().shape({
    comment: Yup.string().max(2200, "Comment has reached maximum characters.")
})

const TextBox = ({ props, post }) => {

    const handleComment = (comment) => {
        const newCommentKey = push(child(ref(database), 'posts/' + post.postId)).key;
        const dbRef = ref(database, 'comments/' + post.postId + '/' + newCommentKey);

        const commentData = {
            comment: comment,
            commentId: newCommentKey,
            timePosted: new Date().getHours(),
            likes: 5,
            username: post.username
        }
        update(dbRef, commentData)
            .then(console.log("success"));
    }

    return (
        <KeyboardAvoidingView>
            <View style={[styles.container, { ...props }]}>
                <View style={styles.imageView}>
                    <Image
                        source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png' }}
                        style={styles.image}
                    />
                </View>
                <Formik
                    initialValues={{ comment: '' }}
                    onSubmit={(values) => handleComment(values.comment)}
                    validationSchema={commentSchema}
                    validateOnMount={true} >
                    {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                        <>
                            <View style={styles.messageBox}>
                                <TextInput
                                    placeholder='Comment...'
                                    placeholderTextColor={'gray'}
                                    onChangeText={handleChange('comment')}
                                    onBlur={handleBlur('comment')}
                                    value={values.comment}
                                    style={styles.inputText} />
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={{ color: 'white' }}>Post</Text>
                                </TouchableOpacity>

                            </View>
                        </>
                    )}

                </Formik>


            </View>
        </KeyboardAvoidingView>
    )
}

export default TextBox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    imageView: {
        justifyContent: 'center',
        paddingLeft: 10
    },
    messageBox: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    inputText: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    image: {
        width: 25,
        height: 25,
        borderRadius: 10,
    },
    button: {
        justifyContent: 'center'
    }
})