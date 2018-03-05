import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { ImagePicker } from 'expo';
import metrics from '../../../theme/config/metrics'
import styles from './styles'

export default class FinishProfile extends React.Component {


    constructor(props) {
        super(props)
        this.state = { 

        }
      }

    takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })
    
        if (!pickerResult.cancelled) {
            console.log(pickerResult.uri)
        }
    }

    uploadPhoto = () => {
        
    }

    pickPhoto = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
          });
          
          if (!pickerResult.cancelled) {
              console.log(pickerResult.uri)
          }
    }

    render() {


        return (
            <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                    <TouchableHighlight 
                        style = {{backgroundColor: 'blue', flex: 1, padding: 15, margin: 10 }}
                        onPress = {() => this.takePhoto()}>
                        <Text style = {{textAlign: 'center'}}>Take Photo</Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style = {{backgroundColor: 'red', flex: 1, padding: 15, margin: 10 }}
                        onPress = {() => this.pickPhoto()}>
                        <Text style = {{textAlign: 'center'}}>Upload Photo</Text>
                    </TouchableHighlight>
            </View>
        )
    }
}