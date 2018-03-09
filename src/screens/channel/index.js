import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'

import firebase from 'firebase'

export default class Channel extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: ''
        }

        this.userObj = this.props.navigation.state.params.userObj
        this.channel = this.props.navigation.state.params.channel
    }

    componentWillMount = async () => {
        await firebase.database().ref('channelConversations').child(this.channel.route).child('messages')
        console.log(this.userObj)
    }

    onSubmitMessage = () => {
        let date = Date.now()
        let message = {
            user: this.uid,
            message: this.state.message,
            date: date
        }
        firebase.database().ref('channelConversations').child(this.channel.route).child('messages').push(message)
    }

    render() {
        return (
            <View>
                <TextInput
                    onChangeText = {(text) => this.setState({message: text})}
                    placeholder = {'Message'}
                />
                <TouchableOpacity style={{height: 50, width: '100%', backgroundColor: 'pink'}} onPress={() => this.onSubmitMessage()}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}