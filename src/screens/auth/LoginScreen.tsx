import React from 'react'
import { Text, View } from 'react-native'
import { NavigationNavigator } from 'react-navigation'

const LoginScreen = ({ navigation }): JSX.Element => (
    <View>
        <Text>Hello World!</Text>
        <Text onPress={() => navigation.navigate('Sign Up')}>
            Go To Sign Up
        </Text>
    </View>
)

export default LoginScreen
