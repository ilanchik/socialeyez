import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: require('../../assets/home1.png'),
        inactive: require('../../assets/home1.png')
    },
    {
        name: 'Search',
        active: require('../../assets/search2.png'),
        inactive: require('../../assets/search2.png')
    },
    {
        name: 'Reels',
        active: require('../../assets/reel.png'),
        inactive: require('../../assets/reel.png')
    },
    {
        name: 'Shop',
        active: require('../../assets/shop.png'),
        inactive: require('../../assets/shop.png')
    },
    {
        name: 'Home',
        active: require('../../assets/profile.png'),
        inactive: require('../../assets/profile.png')
    }
]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home');

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image
                source={activeTab === icon.name ? icon.active : icon.inactive}
                style={styles.icon} />
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>

    )
}

export default BottomTabs

const styles = StyleSheet.create({
    wrapper: {

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10
    },
    icon: {
        width: 30,
        height: 30,
    }
})