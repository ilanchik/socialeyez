import { StyleSheet, KeyboardAvoidingView, SafeAreaView, Keyboard, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MessagesItem from '../components/messages/MessagesItem'
import CommentItem from '../components/comments/CommentItem'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TextBox from '../components/comments/TextBox'
import { FlatList } from 'react-native'

import { COMMENTS } from '../data/comments'
import { useRoute } from '@react-navigation/native'
import { onChildAdded, onChildChanged, onChildRemoved, onValue, ref } from 'firebase/database'
import { database } from '../firebase'

const CommentsScreen = () => {
    const route = useRoute();
    const [post, setPost] = useState(route.params.post);
    const [comments, setComments] = useState([]);

    const getComments = () => {
        const fetchData = [];
        onChildAdded(ref(database, 'comments/' + post.postId), (data) => {
            fetchData.push(data.val());
        })
        onChildRemoved(ref(database, 'comments/' + post.postId), (data) => {
            fetchData.pop(data.val());
        })
        onChildChanged(ref(database, 'comments/' + post.postId), (data) => {

        })
        setComments(fetchData);
    }

    // Set up keyboard offsets
    const [keyboardOffset, setKeyboardOffset] = useState(0);
    const onKeyboardShow = event => setKeyboardOffset(event.endCoordinates.height);
    const onKeyboardHide = () => setKeyboardOffset(0);
    const keyboardDidShowListener = useRef();
    const keyboardDidHideListenr = useRef();

    useEffect(() => {
        getComments();
        keyboardDidShowListener.current = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        keyboardDidHideListenr.current = Keyboard.addListener('keyboardWillHide', onKeyboardHide);

        return () => {
            keyboardDidShowListener.current.remove();
            keyboardDidHideListenr.current.remove();
        }

    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={comments}
                renderItem={({ item }) => <CommentItem comment={item} />}
            //inverted
            />
            <TextBox props={{ bottom: keyboardOffset }} post={post} />

        </SafeAreaView >
    )
}

export default CommentsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }
})