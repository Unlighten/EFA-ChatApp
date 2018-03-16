import React from 'react'
import { Modal, Text, View, TextInput } from 'react-native'

class AddUserModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            users: [],
            message: '',
    }

        this.userInfo = this.props.navigation.state.params.userInfo
    };

    renderItem = ({item}) => {
        console.log(item)
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

}