import React from 'react'
import { Text, View, TextInput, TouchableHighlight, KeyboardAvoidingView  } from 'react-native'
import styles from './styles'
import commonColor from '../../../theme/commonColor';

import * as firebase from 'firebase'

export default class Landing extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            signinEmail: '',
            signinPassword: '',
            signupEmail: '',
            signupPassword: '',
            signupConfirmPassword: '',            
            username: '',
        }
    }

    signin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.signinEmail, this.state.signinPassword)
        .then(res => {
            let uid = res.uid
            this.props.navigation.navigate('FinishProfile', { uid })
        })
        .catch(res => {
        console.log('error ', res.code)
        })
    }

    signup = () => {
        if (this.state.signupPassword == this.state.signupConfirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
            .then(res => {
                let uid = res.uid
                let userInfo = {
                    username: this.state.signupUsername
                }
                firebase.database().ref('userInformation/').child(uid).set(userInfo)
                this.props.navigation.navigate('FinishProfile', { uid })
            })
            .catch(res => {
                console.log('error ', res)

            })
        }
    }

    render() {

        return (
            <View>
                <View style = {styles.view}>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupEmail: text})}
                        placeholder = {'Email'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupUsername: text})}
                        placeholder = {'Username'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupPassword: text})}
                        secureTextEntry = {true}
                        placeholder = {'Password'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupConfirmPassword: text})}
                        secureTextEntry = {true}
                        placeholder = {'Confirm Password'}
                    />
                    <TouchableHighlight 
                        style = {styles.btn}
                        onPress = {() => this.signup()}>
                        <Text style = {styles.text}>Signup</Text>
                    </TouchableHighlight>
                </View>
                <View style = {styles.view}>
                    <TextInput
                    style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signinEmail: text})}
                        placeholder = {'Email'}
                    />
                    <TextInput
                    style = {styles.textInput}
                    onChangeText = {(text) => this.setState({signinPassword: text})}
                        secureTextEntry = {true}
                        placeholder = {'Password'}
                    />
                    <TouchableHighlight 
                        style = {styles.btn}
                        onPress = {() => this.signin()}>
                        <Text style = {styles.text}>Signin</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}