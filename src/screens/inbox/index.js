import React from "react";
import { View, Text, TouchableOpacity, Image, Modal, ScrollView, TextInput } from "react-native";
import styles from "./styles";
import * as firebase from 'firebase'

import Chat from '../chat'
import AddUserModal from '../../components/addUserModal'

export default class Inbox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            inbox: [],
            users: [],
            filteredUsers: [],
    }

        this.userInfo = this.props.navigation.state.params.userInfo
    };

    componentDidMount = async () => {
        let inbox = []
        let uid = this.userInfo.uid
        let filteredUsers = [uid]

        this.refs.modal.show()
        this.refs.modal.hide()

        await firebase.database().ref('userConversations').child(this.userInfo.uid).on('child_added', 
        (res) => {
            if (res.val() == null) {
                return   
            } else {
                firebase.database().ref('conversations').child(res.key).child('metadata').once('value')
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
                        otherUser.conversationKey = res.key
                        return otherUser
                    })
                    .then((otherUser) => {
                        inbox.push(otherUser)
                        this.setState({inbox})
                    })
                })
                .then(() => {
                    firebase.database().ref("userInformation").once("value")
                    .then(res => {
                        const users = Object.entries(res.val()).map(([key, val]) => {
                                val.user = key
                                return val
                        }).reduce((finalUsers, current) => {
                            if (!this.state.filteredUsers.includes(current.user)) {
                                finalUsers.push(current)
                            }
                            return finalUsers
                        }, [])
                        this.setState({users})
                    })
                })
            }
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

    render(){
        return (
            <View style = {styles.container}>
                <TouchableOpacity ref={"modal"} style={styles.addUserBtn} onPress={() => this.refs.modal.show()}>
                    <Text style={styles.addUserText}>Add a User</Text>
                </TouchableOpacity>
                {this.displayConversations(this.userInfo)}
                <AddUserModal ref={"modal"} thisUser={this.userInfo} unmessagedUsers={this.state.users} />
            </View>
        )
    }
}