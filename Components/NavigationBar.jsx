import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function NavigationBar({ navigation }) {
    return (
        <View style={styles.navcontainer}>
          <View style={styles.all}>
            <TouchableOpacity style={styles.locations} onPress={() => navigation.navigate('Locations')}>
              <Image style={styles.locImg} source={require("../assets/worldIcon.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.home}>
            <TouchableOpacity style={styles.home} onPress={() => navigation.navigate('SpecificLocation')}>
              <Image style={styles.homeImg} source={require("../assets/home.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}></View>
        </View>
    )
      
}

const styles = StyleSheet.create({
    navcontainer: {
        flex:1,
        justifyContent:'center'
    },
    home:{
      position:'absolute',
      width:50,
      height:50,
      bottom:-1,
      left:-1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F6F6F6',
      borderTopRightRadius:15,    
      borderColor:'#163172',
      borderWidth:1,

    },
    all:{
      position:'absolute',
      width:50,
      height:50,
      bottom:-1,
      right:-1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#F6F6F6',
      borderTopLeftRadius:15,
      borderColor:'#163172',
      borderWidth:1,
    },
    locImg:{
        width:32,
        height:32,
        tintColor:'#1E56A0',
    },
    homeImg:{
        width:40,
        height:40,
        tintColor:'#1E56A0'
    },
})