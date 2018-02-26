import React from 'react'
import { Text, View } from 'react-native'

import Title from '../../components/title'


export default class Inbox extends React.Component {
    render() {
        return (
            <View>
                <Title />
                <Text>This is the Inbox page</Text>
            </View>
        )
    }
}