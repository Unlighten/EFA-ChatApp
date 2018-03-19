import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import { ImagePicker } from 'expo';
import metrics from '../../../theme/config/metrics'
import styles from './styles'
import firebase from 'firebase'

export default class FinishProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 

        }
        this.uid = this.props.navigation.state.params.uid
        this.username = this.props.navigation.state.params.username
      }

    componentWillMount = () => {
        console.log(this.props.navigation.state.params.uid)
    }
    takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
        })
    
        if (!pickerResult.cancelled) {
            this.setState({ image: pickerResult.uri })
        }
    }

    pickPhoto = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
          });
          
          if (!pickerResult.cancelled) {
              this.setState({ image: pickerResult.uri })
              console.log('here', pickerResult.uri)
          }
    }

    uploadButtonPressed = async () => {
        let uploadResponse, uploadResult;
        let uid = this.uid
        try {
    
            uploadResponse = await this.uploadPhoto(this.state.image);
            uploadResult = await uploadResponse.json();
            let imageUrl = JSON.stringify(uploadResult.location)
            imageUrl = imageUrl.replace(/"/g, '')
            firebase.database().ref('userInformation').child(this.uid).child('profImage').set(imageUrl)
            .then(() => {
                userInfo = {
                    uid: uid,
                    username: this.username,
                    profImage: imageUrl
                }
                this.props.navigation.navigate('Home', { userInfo })
                //must update home as well
            })
            
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, please try again.');
      };
    }

    uploadPhoto = async(uri) => {
        let apiUrl = 'https://file-upload-example-backend-wvyldflqth.now.sh/upload';
    
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        let formData = new FormData();
        formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        });
    
        let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        };
    
        return fetch(apiUrl, options);
    }

    renderButtons = () => {
        let { image } = this.state

        return (
            <View> 
            {image   ?  
                <View style={styles.buttons}>
                    <TouchableHighlight 
                        style = {[styles.deletePhotoBtn, styles.button]}
                        onPress = {() => this.setState({ image: ''})}>
                        <Text style = {{textAlign: 'center'}}>Delete Photo</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {[styles.takePhotoBtn, styles.button]}
                        onPress = {() => this.uploadButtonPressed()}>
                        <Text style = {{textAlign: 'center'}}>Upload Photo</Text>
                    </TouchableHighlight>
                </View>
                :
                <View style={styles.buttons}>
                    <TouchableHighlight 
                        style = {[styles.takePhotoBtn, styles.button]}
                        onPress = {() => this.takePhoto()}>
                        <Text style = {{textAlign: 'center'}}>Take Photo</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {[styles.pickPhotoBtn, styles.button]}
                        onPress = {() => this.pickPhoto()}>
                        <Text style = {{textAlign: 'center'}}>Select Photo</Text>
                    </TouchableHighlight>
                </View>
            }
            </View>
        )
    }

    render() {
        let { image } = this.state
        return (
            <View >
                {!!image && 
                    <Image source={{uri: image}} style={{ width: 250, height: 250, alignSelf: 'center' }} />
                }
                {this.renderButtons()}
            </View>
        )
    }
}