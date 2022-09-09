import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Formik } from 'formik'
import * as Yup from 'yup'
import validator from 'validator'
import { addDoc, collection } from 'firebase/firestore'
import { database } from '../../firebase'
import { ref, set, push } from 'firebase/database'

const RegisterForm = () => {

    // Set navigation
    const navigation = useNavigation();

    // Set login schema (Formik and Yup)
    const registerFormSchema = Yup.object().shape({
        email: Yup.string().email().required("An email is required"),
        username: Yup.string().required().min(2, "Must enter username."),
        password: Yup.string().required().min(6, "Password must be at least 8 characters."),
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api');
        const data = await response.json();
        return data.results[0].picture.large;
    }

    // Sign up with firebase
    const onRegister = async (email, password, username) => {
        try {
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registration SUCCESSFUL', email);
            navigation.replace('Home');

            // Add to firestore database
            /*const dbRef = collection(db, 'users');
            await addDoc(dbRef, {
                uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            });*/

            // Add to realtime database
            set(ref(database, 'users/' + authUser.user.uid), {
                uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            });

        } catch (error) {
            Alert.alert(error.message);
        }
    }

    return (
        <View style={{ width: '100%', padding: 10 }}>
            <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={(values) => {
                    onRegister(values.email, values.password, values.username);
                }}
                validationSchema={registerFormSchema}
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
                                borderColor: values.username.length < 1 || values.username.length > 2 ? '#fff' : 'red'
                            }
                            ]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Username'
                                    placeholderTextColor={'magenta'}
                                    autoCapitalize='none'
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
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
                                style={[styles.registerButton(isValid), { marginTop: 25 }]}
                                onPress={handleSubmit} >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, color: 'white', fontWeight: '300' }}>Already have an account?</Text>
                                <Text
                                    style={{ fontSize: 15, color: 'magenta', fontWeight: '300' }}
                                    onPress={() => navigation.navigate('LoginScreen')}> Login here.</Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
            </Formik>
        </View>
    )
}

export default RegisterForm

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
        borderWidth: 0.5
    },
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontWeight: '300',
        color: 'pink'
    },
    registerButton: (isValid) => ({
        height: 40,
        borderRadius: 10,
        margin: 5,
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