import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Logo from '../../components/Logo'
import RegisterForm from '../../components/authentication/RegisterForm'

const RegisterScreen = () => {

    return (
        <View style={styles.container}>

            <Logo style={styles.logo} />
            <RegisterForm />

        </View>
    )
}

export default RegisterScreen

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