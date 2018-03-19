import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView } from 'react-native'
import styles from './styles'

import firebase from 'firebase'

export default class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messages: []
        }

        this.otherUser = this.props.navigation.state.params.otherUser
        this.userInfo = this.props.navigation.state.params.userInfo
    };

    componentDidMount = () => {
        firebase.database().ref('conversations').child(this.otherUser.conversationKey).child('messages').on('child_added', 
        (child) => {
            let data = child.val()
            firebase.database().ref('userInformation').child(data.sender).once('value')
            .then((res) => {
                let profData = res.val()
                data.profImage = profData.profImage
                data.username = profData.username
                data.key = child.key
            })
            let messages = this.state.messages
            messages.push(data)
            this.setState({messages})
        })
    }

    submitMessage = () => {
        let date = Date.now()
        if (this.state.message.length) {
            let message = {
                msg: this.state.message,
                sender: this.userInfo.uid,
                date: date
            }
            this.setState({message: ''})
            firebase.database().ref('conversations').child(this.otherUser.conversationKey).child('messages').push(message)
        }
    }

    renderItem({item}) {
        if (item.username !== undefined) {
            return (
            <View style={styles.row}>
                <Image style={styles.avatar} source={{uri: item.profImage}} />            
                <View style={styles.rowText}>
                    <Text style={styles.sender}>{item.username}</Text>
                    <Text style={styles.message}>{item.msg}</Text>
                </View>
            </View>
            );
        }
        return
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.username}>{this.otherUser.username}</Text>
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
                        placeholderTextColor="lightgrey"
                    />
                    <TouchableOpacity style={styles.submit} onPress={() => this.submitMessage()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}