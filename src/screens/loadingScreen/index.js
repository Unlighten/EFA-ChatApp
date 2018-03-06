import React, { Component } from 'react';
import firebase from 'firebase';
import { View, ActivityIndicator } from 'react-native';
import commonColor from '../../../theme/commonColor';

export default class LoadingScreen extends Component {

    componentWillMount = async () => {
        console.log('test')
        await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let uid = user.uid
                firebase.database().ref('userInformation').child(uid).child('profImage').once('value')
                .then((res) => {
                    console.log('res', res.val())
                    if (res.val() == undefined) {
                        this.props.navigation.navigate('FinishProfile', { uid })
                    } else {
                        this.props.navigation.navigate('Home', { uid })
                    }
                })
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render = () => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="large"
            color={commonColor.brandPrimary}
          />
        </View>
        );
    }
}    