import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import fetchLocationDetails from '../Hooks/fetchLocationDetails';
import { Image } from 'react-native';
import { getWeatherIcon } from '../utils';


export default function WeatherLocationsCard(location) {
  const { data, loading, error } = fetchLocationDetails(location.location);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (data) {
    return (
      <View style={styles.weatherContainer}>
        <View style={styles.textCont}>
          <Text style={styles.h1}>{data.location.name}</Text>
          <Text style={styles.h2}>{data.current.temp_c} °C</Text>
          <Text style={styles.h2}>{data.current.condition.text}</Text>
        </View>
        <Image source={{ uri: getWeatherIcon(data.current.condition.icon), width: 50, height: 50 }} ></Image>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  weatherContainer: {
    borderColor: '#D6E4F0',
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#D6E4F0',

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    shadowColor: "#1E56A0",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 11.78,
    elevation: 15
  },
  textCont: {
    flex: 1
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E56A0'
  },
  h2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#163172'
  }

})