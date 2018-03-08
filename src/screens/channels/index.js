import React from 'react'
import styles from './styles'
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'

import firebase from 'firebase'
import Channel from '../channel'

export default class Channels extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            channelsArray: [],
            loading: true
        }

        this.userObj = this.props.navigation.state.params.userObj
    }

    componentDidMount = async () => {
        await firebase.database().ref("channels").once("value")
        .then(res => {
            const channelsArray = Object.entries(res.val()).map(([key, val]) => {
                val.name = key
                return val
            })
          this.setState({channelsArray, loading: false})
        })
    }

    renderChannels = () => { 
        let { channelsArray, loading } = this.state
        let userObj = this.userObj
        if (loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator
                        size="large"
                        color={'darkred'}
                    />
                </View>
            )
        }
        return (
          <View style={{flex: 1}}>
            {channelsArray.map((channel, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touchable}
                onPress={() => this.props.navigation.navigate('Channel', { userObj, channel })}
              >
                <View style={styles.row} backgroundColor={channel.style.backgroundColor}>
                  <View style={styles.avatar} backgroundColor={channel.style.avatarText}/>
                  <View style={styles.innerContainer} backgroundColor={channel.style.backgroundColor}>
                    <Text style={styles.text}>{channel.metadata.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
    }

    render() {
        return (
                <View style={styles.container}>
                    {this.renderChannels()}
                </View>
        )
    }
}