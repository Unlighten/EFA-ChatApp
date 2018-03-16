import React from "react";
import { View, Text, TouchableOpacity, Image, Modal, FlatList, ScrollView, TextInput } from "react-native";
import styles from "./styles";
import * as firebase from 'firebase'

import Chat from '../chat'
import AddUserModal from '../../components/addUserModal'

export default class Inbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            users: [],
            inbox: [],
            message: '',
    }

        this.userInfo = this.props.navigation.state.params.userInfo
    };

    componentDidMount = async () => {
        let filteredUsers = []
        let inbox = []
        let uid = this.userInfo.uid

        await firebase.database().ref('userConversations').child(this.userInfo.uid).once('value')
        .then((res) => {
            const keys = Object.entries(res.val()).map(([key, val]) => {
                return key
                
            })
            for (let key of keys) {
                firebase.database().ref('conversations').child(key).child('metadata').once('value')
                .then((res) => {
                    let data = res.val()
                    let otherUser = {
                        userId: data.initiator == uid ? data.receiver : data.initiator
                    }
                    filteredUsers.push(otherUser.userId)
                    this.setState({filteredUsers})
                    return otherUser
                })
                .then((otherUser) => {
                    firebase.database().ref('userInformation').child(otherUser.userId).once('value')
                    .then((res) => {
                        let profData = res.val()
                        otherUser.username = profData.username
                        otherUser.profImage = profData.profImage
                        otherUser.conversationKey = key
                        console.log(otherUser)
                        return otherUser
                    })
                    .then((otherUser) => {
                        inbox.push(otherUser)
                        this.setState({inbox})
                    })
                })
            }
        })
        await firebase.database().ref("userInformation").once("value")
        .then(res => {
            const users = Object.entries(res.val()).map(([key, val]) => {
                    val.user = key
                    return val
            }).reduce((finalUsers, current) => {
                if (!this.state.filteredUsers.includes(current.user)) {
                    // console.log('keys', this.state.filteredUsers, current)
                    finalUsers.push(current)
                }
                return finalUsers
            }, [])
          this.setState({users})
        })
    }

    displayConversations = (userInfo) => {
        return (
            <ScrollView>
                {this.state.inbox.map((otherUser) => (
                <View key={otherUser.userId}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', { userInfo, otherUser})}>
                    <View style={styles.row}>
                        <Image style={styles.avatar} source={{uri: otherUser.profImage}} />
                        <Text style={styles.usernameText}>{otherUser.username}</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                ))}
            </ScrollView>
        )
    }

        submitMessage = (userId) => {
            let date = Date.now()
        if (this.state.message.length) {
            let metadata = {
                metadata: {
                    initiator: this.userInfo.uid,
                    receiver: userId,
                    date: date
                }
            }
            let message = {
                msg: this.state.message,
                sender: this.userInfo.uid,
            }
            this.setState({message: ''})
            firebase.database().ref('conversations').push(metadata)
            .then((res) => {
                return res.key
            })
            .then((key) => {
                firebase.database().ref('conversations').child(key).child('messages').push(message)
                return key
            })
            .then((key) => {
                firebase.database().ref('userConversations').child(this.userInfo.uid).child(key).set(true)
                return key
            })
            .then((key) => {
                firebase.database().ref('userConversations').child(userId).child(key).set(true)
            })
        }
    }

        startChat = (userId) => {
            if (userId == this.state.sendingTo) {
            return (
                <View style={styles.messageRow}>
                    <TextInput
                        value={this.state.message}
                        onChangeText={text => this.setState({message: text})}
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="lightgrey"
                        placeholder="Message..."
                    />
                    <TouchableOpacity style={styles.submit} onPress={() => this.submitMessage(userId)}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return
    }

    renderItem = ({item}) => {
        // console.log(item)
        if (item.user == undefined) {
            return
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.setState({sendingTo: item.user})}>
                        <View style={styles.row}>
                            <Image style={styles.avatar} source={{uri: item.profImage}} />
                            <Text style={styles.usernameText}>{item.username}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                    <View>
                        {this.startChat(item.user)}
                    </View>
                    }  
                </View>
            );
        }
    }

    userModal = () => {
        return (
            <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.modalVisible}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Start a Conversation</Text>
                    <TouchableOpacity style={styles.hideModalBtn}
                     onPress={() => {this.setState({modalVisible: false})}}>
                        <Text style={styles.hideModalText}>Close</Text>
                    </TouchableOpacity>
                    <FlatList 
                     data={this.state.users} 
                     extraData={this.state}
                     renderItem={this.renderItem}
                     keyExtractor={(item) => item.username} 
                    />
                </View>
            </Modal>
        )
    }

    render(){
        return (
            <View style = {styles.container}>
                <TouchableOpacity style={styles.addUserBtn} onPress={() => this.setState({modalVisible: true})}>
                    <Text style={styles.addUserText}>Add a User</Text>
                </TouchableOpacity>
                {this.displayConversations(this.userInfo)}
                {this.userModal()}  
                {/* <AddUserModal /> */}
            </View>
        )
    }
}