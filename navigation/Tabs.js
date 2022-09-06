import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'
import ShopScreen from '../screens/ShopScreen';
import SearchScreen from '../screens/SearchScreen';
import NewPostScreen from '../screens/NewPostScreen';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -15,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow
    }}>
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: 'pink'
      }}>
      {children}
    </View>
  </TouchableOpacity>
)

const Tabs = () => {

  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName='HomeFeed'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#312e30',
          borderTopWidth: 0,
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
          height: 55,
          paddingTop: 25,
          ...styles.shadow
        }
      }}
    >
      <Tab.Screen name="HomeFeed" component={HomeScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/home1.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'violet' : null
              }} />
          </View>
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/profile.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'violet' : null
              }} />
          </View>
        ),
      }} />
      <Tab.Screen name="Post" component={NewPostScreen} headerShown={true} tabBarStyle options={{
        headerShown: true,
        tabBarStyle: { display: 'none' },
        title: "POST",
        headerTitleStyle: { color: 'pink', fontWeight: '700', fontSize: 20 },
        headerTintColor: '#fff',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: 'black' },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 30, width: 50, margin: 5 }}
              source={require('../assets/back2.png')} />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused }) => (
          <View>
            <Image
              source={require('../assets/add.png')}
              resizeMode='contain'
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? 'violet' : null
              }} />
          </View>
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} />
        ),
      }} />
      <Tab.Screen name="Shop" component={ShopScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/shop.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'violet' : null
              }} />
          </View>
        ),
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/search2.png')}
              resizeMode='contain'
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'violet' : null
              }} />
          </View>
        ),
      }} />
    </Tab.Navigator>
  )
}

export default Tabs

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#ff4ce7',
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5
  }
})