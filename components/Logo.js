import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { auth } from '../firebase'
import { database } from '../firebase'
import { push, set, ref, update, child, onValue, onChildAdded } from 'firebase/database'

const handleSignOut = () => {
    auth.signOut().then(() => console.log("Signed out"))
}

/**
 * ************TESTING**************************
 */
const testing = () => {
    var newPostKey = push(child(ref(database), 'posts')).key;

    try {
        update(ref(database, 'posts/' + newPostKey), {
            id: 12345,
            school: 'Kellogg',
        });

        onChildAdded(ref(database, 'posts/'), (data) => {
            console.log(data.val().id);
        })

    } catch (error) {
        Alert.alert(error.message)
    }

}


const Logo = ({ style, size }) => {
    return (
        <TouchableOpacity onPress={handleSignOut}>
            <MaskedView
                style={style}
                maskElement={<Text
                    style={{ fontSize: 38, marginTop: 10 }}>socialeyez</Text>}>
                <LinearGradient
                    style={{ flex: 1, fontWeight: 'bold', fontSize: 48 }}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['magenta', 'yellow']}>
                </LinearGradient>
            </MaskedView>
        </TouchableOpacity>
    )
}

export default Logo

const styles = StyleSheet.create({
})