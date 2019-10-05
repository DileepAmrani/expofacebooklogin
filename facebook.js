import React from 'react'
import { View, Button,Alert } from 'react-native'

import * as Facebook from 'expo-facebook';
import * as Permissions from 'expo-permissions';

class Login extends React.Component {

    logIn = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('1385260031627668', {
                permissions: ['public_profile','email'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                console.log(response.json(), 'alldata')
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button title='Facebook Login' onPress={this.logIn} />
            </View>
        )
    }
}

export default Login