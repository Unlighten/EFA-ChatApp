import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class Title extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ChitChat</Text>
            </View>
        )
    }
}

export default Title;