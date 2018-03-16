import React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
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
            console.log(child)
        })
    }

    submitMessage = () => {
        let date = Date.now()
        if (this.state.message.length) {
            let message = {
                msg: this.state.message,
                sender: this.userInfo.uid,
            }
            this.setState({message: ''})
            firebase.database().ref('conversations').child(this.otherUser.conversationKey).child('messages').push(message)
           
        }
    }

    renderItem({item}) {
        console.log('whats', item)
        if (item.username && item.profImage !== undefined) {
            return (
            <View key={item.key} style={styles.row}>
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
            <View>
                <Text style={styles.username}>{this.otherUser.username}</Text>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <FlatList 
                 data={this.state.messages} 
                 extraData={this.state}
                 renderItem={this.renderItem}
                 keyExtractor={(item) => item.key} 
                />
                <View style={styles.messageRow}>
                    <TextInput
                        value={this.state.message}
                        onChangeText={text => this.setState({message: text})}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="lightgrey"
                        placeholder="Message..."
                    />
                    <TouchableOpacity style={styles.submit} onPress={() => this.submitMessage()}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit} onPress={() => console.log('here', this.state.messages)}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}