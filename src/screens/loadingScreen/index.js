import React, { Component } from 'react';
import firebase from 'firebase';
import { View, ActivityIndicator } from 'react-native';
import commonColor from '../../../theme/commonColor';

export default class LoadingScreen extends Component {

    componentDidMount = async () => {
        await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let uid = user.uid
                firebase.database().ref('userInformation').child(uid).once('value')
                .then((res) => {
                    let data = res.val()
                    let username = data.username
                    let profImage = data.profImage
                    if (data.profImage == undefined) {
                        this.props.navigation.navigate('FinishProfile', { uid, username })
                        //must update finsh profile also
                    } else {
                        let userInfo = {
                            uid: uid,
                            username: username,
                            profImage: profImage
                        }
                        this.props.navigation.navigate('Home', { userInfo })
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