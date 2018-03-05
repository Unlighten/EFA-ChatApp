import React from 'react'
import styles from './styles'
import { Text, View, Image, TouchableOpacity } from 'react-native'


export default class Channels extends React.Component {

runFunction = () => {
    console.log('sup dude')
}

    render() {
        // return (
        //     <Text>This is the channels page</Text>
        // )
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {this.runFunction()}}>                
                    <View style = {styles.row}>
                        <Image source={require('../../../assets/slickdaddyclub.png')} style = {styles.avatar}/>
                        <View style={styles.innerContainer}>                        
                            <Text style = {styles.text}>Channel 1</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.runFunction()}}>                
                    <View style = {styles.row}>
                        <Image source={require('../../../assets/slickdaddyclub.png')} style = {styles.avatar}/>
                        <View style={styles.innerContainer}>                        
                            <Text style = {styles.text}>Channel 2</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.runFunction()}}>                
                    <View style = {styles.row}>
                        <Image source={require('../../../assets/slickdaddyclub.png')} style = {styles.avatar}/>
                        <View style={styles.innerContainer}>                        
                            <Text style = {styles.text}>Channel 3</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}