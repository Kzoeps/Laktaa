import React from 'react'
import { Text, View } from 'react-native'

const LoginScreen = ({ navigation }) => (
    <View>
        <Text>Hello World!</Text>
        <Text onPress={() => navigation.navigate('SignUp')}>Go To Sign Up</Text>
    </View>
)

export default LoginScreen
