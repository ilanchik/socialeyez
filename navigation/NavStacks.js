import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './Tabs';
import LoginScreen from '../screens/Authentication/LoginScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import MessagesScreen from '../screens/MessagesScreen';
import NewPostScreen from '../screens/NewPostScreen';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (

        <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Tabs} options={{ header: () => null }} />
            <Stack.Screen
                name='MessagesScreen'
                component={MessagesScreen}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: 'black' },
                    title: 'Messages',
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Image
                            style={{ height: 30, width: 50, margin: 5 }}
                            source={require('../assets/back2.png')} />
                    )
                }} />
            <Stack.Screen name='AuthStack' component={AuthStack} />
            <Stack.Screen
                name='Comments'
                component={CommentsScreen}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: 'black' },
                    title: 'Comments',
                    headerTintColor: 'white',
                    headerBackTitleVisible: false,
                    headerBackImage: () => (
                        <Image
                            style={{ height: 30, width: 50, margin: 5 }}
                            source={require('../assets/back2.png')} />
                    )
                }}
            />
        </Stack.Navigator>
    )
}

export { AuthStack, HomeStack };

const styles = StyleSheet.create({})