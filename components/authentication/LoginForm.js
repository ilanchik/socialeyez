import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import { set, ref, push } from 'firebase/database'
import { database } from '../../firebase'

const LoginForm = () => {
    /* Set useState
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(error.message)
            })
    }*/

    // Set login schema (Formik and Yup)
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        password: Yup.string().required().min(6, "Password must be at least 8 characters.")
    })

    // Set navigation
    const navigation = useNavigation();

    // Firebase login
    const onLogin = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Firebase login SUCCESSFUL', email);
            navigation.replace('Home');

        } catch (error) {
            Alert.alert('Invalid Login', 'Invalid credentials\n' + error.message, [
                {
                    text: 'OK',
                    onPress: () => console.log('OK'),
                    style: 'cancel'
                },
                {
                    text: 'Sign Up',
                    onPress: () => navigation.navigate('RegisterScreen')
                }
            ]);
        }
    }

    return (
        <View style={{ width: '100%', padding: 10 }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password);
                }}
                validationSchema={loginFormSchema}
                validateOnMount={true} >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View>
                            <View style={[styles.inputView,
                            {
                                borderColor: values.email.length < 1 || validator.isEmail(values.email) ? '#fff' : 'red'
                            }
                            ]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Email'
                                    placeholderTextColor={'magenta'}
                                    autoCapitalize='none'
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                    autoFocus={true}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            <View style={[styles.inputView,
                            {
                                borderColor: 1 > values.password.length || values.password.length > 6 ? '#fff' : 'red'
                            }
                            ]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Password'
                                    textContentType='password'
                                    placeholderTextColor={'magenta'}
                                    secureTextEntry={true}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.loginButton(isValid), { marginTop: 25 }]}
                                onPress={handleSubmit} >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: 'white', fontWeight: '300' }}>Don't have an account?</Text>
                                <Text
                                    style={{ fontSize: 15, color: 'magenta', fontWeight: '300' }}
                                    onPress={() => navigation.navigate('RegisterScreen')}> Register here.</Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
            </Formik>
        </View>
    )
}

export default LoginForm

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
    inputView: {
        height: 40,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 0.5,
        marginHorizontal: 20
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontWeight: '300',
        color: 'pink'
    },
    loginButton: (isValid) => ({
        height: 40,
        borderRadius: 10,
        margin: 5,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isValid ? 'white' : 'gray',
    }),
    buttonText: {
        color: 'magenta',
        fontSize: 20,
        fontWeight: '300'
    }
})