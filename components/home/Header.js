import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Logo from '../Logo'

const Header = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Logo style={styles.logo} />

            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../assets/add.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image style={styles.icon} source={require('../../assets/heart_outline.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MessagesScreen')}>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>10</Text>
                    </View>
                    <Image style={styles.icon} source={require('../../assets/message.png')} />
                </TouchableOpacity>
            </View>

        </View >
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    logo: {
        width: 175,
        height: 58,
        resizeMode: 'contain',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadge: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 25,
        bottom: 18,
        width: 20,
        height: 13,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
})