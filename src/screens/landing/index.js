import React from 'react'
import { Text, View, Button, TextInput, Label, TouchableHighlight } from 'react-native'
import styles from './styles'
import commonColor from '../../../theme/commonColor';

import * as firebase from 'firebase'

import Title from '../../components/title'

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

    signin() {
        firebase.auth().signInWithEmailAndPassword(this.state.signinEmail, this.state.signinPassword)
        .then(res => {
        this.props.navigation.navigate("Channels")
        })
        .catch(res => {
        console.log('error ', res.code)
        if(res){
            switch(res.code){
    
            case 'auth/wrong-password':
                alert('Incorrect Password.')
            break
            case 'auth/user-not-found':
                alert('This email is not associated with an account.')
            break
            case "auth/invalid-email":
                alert('The specified email is not a valid email.');
            break
    
            default:
                alert('Unknown error.')
            }
        }
        })
    }

    signup() {
        if (this.state.signupPassword == this.state.signupConfirmPassword) {
            const newUser = {
                email: this.state.signupEmail,
                username: this.state.signupUsername,
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.signupEmail, this.state.signupPassword)
            .then(res => {
                let uid = res.uid
                let userInfo = {
                    username: newUser.username
                }
                firebase.database().ref('userInformation/').child(uid).set(userInfo)
                return uid
            })
            .then(uid => {
                this.props.navigation.navigate(
                    "Channels",
                    { uid },
                )
            })
            .catch(res => {
                console.log('error ', res)
                if(res){
                    switch(res.code){
            
                    case "auth/email-already-in-use":
                        alert("This email is already in use.");
                    break;
            
                    case "auth/invalid-email":
                        alert("The specified email is not a valid email.");
                    break;
            
                    default:
                        alert('Unknown error.');
                    }
                }
            })
        } else {
            alert('Passwords do not match. Please try again')
        }
    }


    render() {
        return (
            <View>
                <Title />
                <View style = {styles.view}>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signinEmail: text})}
                        maxLength = {30}
                        placeholder = {'Email'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signinPassword: text})}
                        secureTextEntry = {true}
                        maxLength = {30}
                        placeholder = {'Password'}
                    />
                    <TouchableHighlight 
                     style = {styles.btn}
                     underlayColor = {commonColor.underlay}
                     onPress = {() => this.signin()}>
                        <Text style = {styles.text}>Signin</Text>
                    </TouchableHighlight>
                </View>
                
                <View style = {styles.view}>
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupEmail: text})}
                        maxLength = {30}
                        placeholder = {'Email'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupUsername: text})}
                        maxLength = {20}
                        placeholder = {'Username'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupPassword: text})}
                        secureTextEntry = {true}
                        maxLength = {30}
                        placeholder = {'Password'}
                    />
                    <TextInput
                        style = {styles.textInput}
                        onChangeText = {(text) => this.setState({signupConfirmPassword: text})}
                        secureTextEntry = {true}
                        maxLength = {30}
                        placeholder = {'Confirm Password'}
                    />
                    <TouchableHighlight 
                     style = {styles.btn}
                     underlayColor = {commonColor.underlay}
                     onPress = {() => this.signup()}>
                        <Text style = {styles.text}>Signup</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}