import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, FlatList } from 'react-native'
import styles from './styles'

import firebase from 'firebase'

export default class Channel extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            message: '',
            messages: [],
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
                data.key = child.key
            })
            let messages = this.state.messages
            messages.push(data)
            this.setState({messages})
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
            this.setState({message: ''})
            firebase.database().ref('channelConversations').child(this.channel.route).child('messages').push(message)
        }
    }

    renderItem({item}) {
        if (item.username && item.profImage !== undefined) {
            return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={{uri: item.profImage}} />
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.username}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            </View>
            );
        }
        return
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <FlatList 
                 data={this.state.messages} 
                 extraData={this.state}
                 renderItem={this.renderItem}
                 keyExtractor={(item, index) => index}
                 ref={ref => this.flatList = ref}
                 onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                 onLayout={() => this.flatList.scrollToEnd({animated: true})}
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
                    <TouchableOpacity style={styles.submit} onPress={() => this.onSubmitMessage()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}