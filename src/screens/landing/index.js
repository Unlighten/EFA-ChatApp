import React from 'react'
import { Text, View, Button } from 'react-native'
import styles from './styles'
import commonColor from '../../../theme/commonColor';

import Title from '../../components/title'

export default class Landing extends React.Component {
    render() {
        return (
            <View>
                <Title />
                <Button color={commonColor.brandColor}
                 onPress={() => this.props.navigation.navigate('Channels')}
                 title={'Login'}
                />
            </View>
        )
    }
}