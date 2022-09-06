import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import { POSTS } from '../data/posts';
import { auth, database } from '../firebase';
import { onValue, ref } from 'firebase/database';

const HomeScreen = () => {

    useEffect(() => {
        const user = auth.currentUser.uid;

        const dbRef = ref(database, 'users/' + user + '/posts/');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
        })
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <ScrollView>
                {POSTS.map((post, index) => (
                    <Post post={post} key={index} />
                ))}

            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen;

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }
});