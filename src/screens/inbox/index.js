import React from "react";
import { View, Text, TouchableOpacity, Image, ListView, ScrollView } from "react-native";
import styles from "./styles";
import * as firebase from 'firebase'

export default class Inbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inbox: []
    }
  };

runFunction = () => {
    console.log('sup brev')
}  

  render(){
        // return(
        //     <Text>This is the inbox page</Text>
        // )
      return (
        <View style = {styles.container}>
            <ScrollView>
            {/* <ListView> */}            
                <TouchableOpacity onPress = {() => this.runFunction()}>
                    <View style={styles.row}>
                        <Image 
                            source={require('../../../assets/slickdaddyclub.png')}
                            style={styles.avatar}
                        />
                        <View style = {styles.innerContainer} onPress = {() => this.runFunction()}>
                            <Text style = {styles.text}>Text</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            {/* </ListView> */}            
            </ScrollView>            
        </View>
      )
    }
  }