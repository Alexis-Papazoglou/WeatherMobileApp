import { StyleSheet, Text, View } from 'react-native'
import React, { useState , useEffect} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FollowingHoursSingleCard from './FollowingHoursSingleCard'
import { useWeatherContext } from '../Context/WeatherContext'
import fetchLocationDetails from '../Hooks/fetchLocationDetails'

export default function FollowingHoursCardsContainer() {

  //i fetch again the data because when i pass it as props from the parent i get a bug
  //and the data of this component are not getting updated properly
  const { selectedLocation } = useWeatherContext()
  const { data, loading, error } = fetchLocationDetails(selectedLocation);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  
  if (data) {

    const followingHoursData = filterWeatherForecast()

    function filterWeatherForecast(maxItems = 20) {

      const forcastData = []
      for (let index = 0; index < 48; index++) {
        if (index < 24) {
          forcastData[index] = data.forecast.forecastday[0].hour[index]
        }
        else {
          forcastData[index] = data.forecast.forecastday[1].hour[index - 24]
        }
      }
      // console.log(forcastData);

      const currentDateTime = new Date(data.location.localtime);

      // Filter items that are after the current time
      const filteredData = forcastData.filter(item => {
        const forecastDateTime = new Date(item.time);
        return forecastDateTime > currentDateTime;
      });

      // Take the first 'maxItems' from the filtered array
      const limitedData = filteredData.slice(0, maxItems);

      //console.log(limitedData)

      return limitedData;
    }

    return (
      <View style={styles.hourlyForecast}>
        <View style={styles.hourlyForecastTextContainer}>
          <Text style={styles.hourlyForecastText}>Hourly forecast</Text>
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.cardsList}>
          {followingHoursData.map((hour, index) => (
            <FollowingHoursSingleCard key={index} hourData={hour} exactTime={data.location.localtime}></FollowingHoursSingleCard>
          ))}
        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  hourlyForecastText: {
    padding: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#472183'
  },
  hourlyForecast: {
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 140,
    width:350,

    shadowColor: "#1E56A0",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 11.78,
    elevation: 15,
  },
  hourlyForecastTextContainer: {
    borderBottomWidth: 0.5,
    backgroundColor: '#D6E4F0',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  cardsList:{
    paddingHorizontal:4,
    overflow:'hidden',
    borderBottomRadius:10
  }
})