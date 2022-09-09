import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import { POSTS } from '../data/posts';
import { auth, database } from '../firebase';
import { useIsFocused } from '@react-navigation/native';
import { child, onChildAdded, onValue, orderByKey, query, ref } from 'firebase/database';

const HomeScreen = () => {

    const focus = useIsFocused();

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        const dbRef = ref(database, 'posts');
        return onChildAdded(dbRef, (data) => {
            console.log(data.key);
        })
    }

    const getPosts2 = async () => {
        const user = auth.currentUser.uid;

        const dbRef = child(ref(database), 'posts');
        var fetchData = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchData.push(data);
            })
        })
        setPosts(fetchData);
    }

    useEffect(() => {
        if (focus === true) {
            getPosts2();
        }
        //getPosts();
    }, [focus]);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
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