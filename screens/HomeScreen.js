import { View, Text, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import { POSTS } from '../data/posts';
import { auth, database } from '../firebase';
import { useIsFocused } from '@react-navigation/native';
import { child, onChildAdded, onChildChanged, onValue, ref } from 'firebase/database';

const HomeScreen = () => {

    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        const dbRef = child(ref(database), 'posts');
        var fetchData = [];
        var fetchKey = [];
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key;
                const data = childSnapshot.val();
                fetchData.push(data);
                fetchKey.push(key);
            })
        })
        setPosts(fetchData);
    }

    // Data load upon screen focus (neeed to update upon initial app render)
    const focus = useIsFocused();
    useEffect(() => {
        if (focus === true) {
            getPosts();
        }
    }, [focus]);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <Stories />
            <FlatList
                data={posts}
                renderItem={({ item }) => <Post post={item} />}
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
            />
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