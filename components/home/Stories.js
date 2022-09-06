import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'


const Stories = () => {
    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {USERS.map((story, index) => (
                    <View key={index} style={{ alignItems: 'center' }}>
                        <Image source={story.image} style={styles.story} />
                        <Text style={{ color: 'white' }}>{
                            (story.user.length > 11
                                ? story.user.slice(1, 10).toLowerCase() + '...'
                                : story.user)
                        }</Text>
                    </View>
                ))}

            </ScrollView>
        </View>
    )
}

export default Stories

const styles = StyleSheet.create({
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 2,
        borderColor: 'violet',
    }
})