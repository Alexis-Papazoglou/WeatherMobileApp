import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet , TextInput } from 'react-native';
import NavigationBar from '../Components/NavigationBar';
import { useWeatherContext } from '../Context/WeatherContext';
import WeatherCard from '../Components/WeatherLocationsCard';
import { ScrollView } from 'react-native-gesture-handler';


export default function Locations({ navigation }) {

    const { locations, setSelectedLocation } = useWeatherContext()

    function handleCardPress(location){
        setSelectedLocation(location)
        navigation.navigate('SpecificLocation')
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.locationsContainer}>
                <View>
                    {locations.map((location , index) => {
                        return (
                            <TouchableOpacity onPress={() => handleCardPress(location)} key={index} >
                                <WeatherCard location={location}></WeatherCard>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddLocation')}>
                <Text style={styles.add}>+</Text>
            </TouchableOpacity>
            <View style={styles.navigationContainer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#F6F6F6',
        flex: 1,
    },
    locationsContainer: {
        flex: 1, // Take up all available space above the navigation component
        marginTop:20,
    },
    add:{
        fontSize:25,
        color:'black'
    },
    addBtn:{
        backgroundColor:'#F6F6F6',
        position:'absolute',
        bottom:0,
        width:90,
        height:40,
        borderTopLeftRadius:80,
        borderTopRightRadius:80,
        borderWidth:1,
        borderBottomWidth:0,
        borderColor:'#472183',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
});