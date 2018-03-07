import React from 'react'
import styles from './styles'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import firebase from 'firebase'


export default class Channels extends React.Component {

    componentDidMount = async() => {
        const res = await firebase.database().ref("channels").once("value");
        const arrayObjects = Object.values(res.val());
        const mapTest = arrayObjects.map(item => ({item}));
        console.log(res)
    }

    renderChannels = async () => {     
        return (
          <View>
            {mapTest.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.touchable}
                onPress={() => console.log("channel 1")}
              >
                <View style={styles.row} backgroundColor={"blue"}>
                  <View style={styles.avatar} backgroundColor={"red"} />
                  <View style={styles.innerContainer} backgroundColor={"green"}>
                    <Text style={styles.text}>test</Text>
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











        // return (
        //     <View style={styles.container}>
        //         <TouchableOpacity style={styles.touchable} onPress={() => console.log('channel 1')}>                
        //             <View style = {styles.row1}>
        //                 <View style = {styles.avatar1}/>
        //                 <View style={styles.innerContainer}>                        
        //                     <Text style = {styles.text1}>Channel 1</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={styles.touchable} onPress={() => console.log('channel 2')}>                
        //             <View style = {styles.row2}>
        //                 <View  style = {styles.avatar2}/>
        //                 <View style={styles.innerContainer}>                        
        //                     <Text style = {styles.text2}>Channel 2</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //         <TouchableOpacity style={styles.touchable} onPress={() => console.log('channel 3')}>                
        //             <View style = {styles.row3}>
        //                 <View style = {styles.avatar3}/>
        //                 <View style={styles.innerContainer}>                        
        //                     <Text style = {styles.text3}>Channel 3</Text>
        //                 </View>
        //             </View>
        //         </TouchableOpacity>
        //     </View>
        // )
    }
}