import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../components/Logo'
import LoginForm from '../../components/authentication/LoginForm'

const LoginScreen = () => {

    return (
        <View style={styles.container}>

            <Logo style={styles.logo} />
            <LoginForm />

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    logo: {
        width: 175,
        height: 58,
        resizeMode: 'contain',
    },
})