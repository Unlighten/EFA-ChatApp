import React from 'react'
import { Modal, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import styles from './styles'
import firebase from 'firebase'

export default class AddUserModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            message: '',
            unmessagedUsers: []
        }
        thisUser = this.props.userInfo
    };


    componentWillReceiveProps = () => {
        let unmessagedUsers = this.props.unmessagedUsers
        this.setState({unmessagedUsers})
    }
    

    show = () => {
        this.setState({
          modalVisible: true,
        })
      }

      hide = () => {
        this.setState({
          modalVisible: false,
        })
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
        )}
        return
    }

    submitMessage = (userId) => {
        let date = Date.now()
        if (this.state.message.length) {
            let metadata = {
                metadata: {
                    initiator: this.props.thisUser.uid,
                    receiver: userId,
                    date: date
                }
            }
            let message = {
                msg: this.state.message,
                sender: this.props.thisUser.uid,
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
                firebase.database().ref('userConversations').child(this.props.thisUser.uid).child(key).set(true)
                return key
            })
            .then((key) => {
                firebase.database().ref('userConversations').child(userId).child(key).set(true)
            })
        }
        this.setState({modalVisible: false})
    }

    renderItem = ({item}) => {
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

    render() {
        return (
            <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.modalVisible}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Start a Conversation</Text>
                    <TouchableOpacity style={styles.hideModalBtn}
                     onPress={() => this.hide()}>
                        <Text style={styles.hideModalText}>Close</Text>
                    </TouchableOpacity>
                    <FlatList 
                     data={this.props.unmessagedUsers}
                     extraData={this.state}
                     renderItem={this.renderItem}
                     keyExtractor={(item) => item.username} 
                    />
                </View>
            </Modal>
        )
    }

}