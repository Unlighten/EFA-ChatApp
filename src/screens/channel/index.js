import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native'
import styles from './styles'

import firebase from 'firebase'

export default class Channel extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: '',
            messages: []
        }

        this.userInfo = this.props.navigation.state.params.userInfo
        this.channel = this.props.navigation.state.params.channel
    }

    componentDidMount = () => {
        firebase.database().ref('channelConversations').child(this.channel.route).child('messages').on('child_added', 
        (child) => {
            let data = child.val()
            firebase.database().ref('userInformation').child(data.user).once('value')
            .then((res) => {
                let userData = res.val()
                data.profImage = userData.profImage
                data.username = userData.username
                // console.log()
            })
            console.log(data)            
            this.setState({messages: [...this.state.messages, data]})
        })
    }

    onSubmitMessage = () => {
        let date = Date.now()
        if (this.state.message.length) {
            let message = {
                user: this.userInfo.uid,
                message: this.state.message,
                date: date
            }
            firebase.database().ref('channelConversations').child(this.channel.route).child('messages').push(message)
        }
    }

    renderItem({item}) {
        console.log(item)
        if (item.username && item.profImage) {
            return (
            <View keyExtractor={item.user} style={styles.row}>
                <Text style={styles.sender}>{item.username}</Text>
                <Text style={styles.message}>{item.message}</Text>
            </View>
            );
        }
        return
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList 
                 data={this.state.messages} 
                 renderItem={this.renderItem}
                 keyExtractor={(item, index) => index} 
                 inverted
                />
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
                <View style={styles.footer}>
                    <TextInput
                        value={this.state.message}
                        onChangeText={text => this.setState({message: text})}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="Message..."
                    />
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}