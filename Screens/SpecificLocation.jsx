import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Navigation from '../Components/NavigationBar'
import { useWeatherContext } from '../Context/WeatherContext';
import { LinearGradient } from 'expo-linear-gradient';
import fetchLocationDetails from '../Hooks/fetchLocationDetails';
import { getWeatherIcon, utilsSetUserGeoloc } from '../utils';
import FollowingHoursCardsContainer from '../Components/FollowingHoursCardsContainer';
import FollowingDaysCardsContainer from '../Components/FollowingDays/FollowingDaysCardsContainer';

export default function SpecificLocation({ navigation }) {

  const { selectedLocation } = useWeatherContext()
  const { data } = fetchLocationDetails(selectedLocation);

  utilsSetUserGeoloc()

  if (selectedLocation === 'none') {
    return (
      <LinearGradient colors={['#F1F6F5', '#82C3EC']} style={styles.container} >
        <View style={styles.specLocCont}>
          <Text style={styles.h1}>No added locations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddLocation')}>
            <View style={styles.addOneNow}>
              <Text style={[styles.add]}>Add one now!</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationContainer}>
          <Navigation navigation={navigation} />
        </View>
      </LinearGradient>
    );
  } else if (data) {
    return (
      <LinearGradient colors={['#F1F6F5', '#82C3EC']} style={styles.container} >
        <ScrollView>
          <View style={styles.specLocCont}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsText}>
                <Text style={styles.h1}>{data.location.name} , </Text>
                <Text style={styles.h1}>{data.location.country}</Text>
              </View>
              <View style={styles.iconDisplay}>
                <Image source={{ uri: getWeatherIcon(data.current.condition.icon), width: 120, height: 120 }} ></Image>
                <View style={styles.underIconSubTitle}>
                  <Text style={styles.h1}>{data.current.condition.text} , </Text>
                  <Text style={styles.h1}>{data.current.temp_c} °C</Text>
                </View>
                <View style={[styles.underIconSubTitle, { marginTop: 12 }]}>
                  <Text style={styles.h2}>L : {data.forecast.forecastday[0].day.mintemp_c} °C ,</Text>
                  <Text style={styles.h2}>H : {data.forecast.forecastday[0].day.maxtemp_c} °C </Text>
                </View>
              </View>
              <FollowingHoursCardsContainer />
              <FollowingDaysCardsContainer data={data} />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddLocation')}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <View style={styles.navigationContainer}>
          <Navigation navigation={navigation} />
        </View>
      </LinearGradient>

    )
  } else {
    return (
      <>
        <View style={styles.specLocCont}>
          <Text style={styles.h1}>Error fetching data</Text>
        </View>
        <View style={styles.navigationContainer}>
          <Navigation navigation={navigation} />
        </View>
      </>
    )
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  specLocCont: {
    marginTop: 40,
    flex: 1, // Take up all available space above the navigation component
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: 100,
    height: 100
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#071952',
    textAlign: 'center'
  },
  h2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#472183',
    textAlign: 'center'
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsText: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25
  },
  iconDisplay: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  underIconSubTitle: {
    flexDirection: 'row'
  },
  addOneNow: {
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#4B56D2',
    shadowColor: '#472183',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 31,
    elevation: 0,
  },
  add: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F1F6F5',
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,

  },
  addBtn: {
    backgroundColor: '#F6F6F6',
    position: 'absolute',
    bottom: 0,
    width: 90,
    height: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#472183',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  addText: {
    fontSize: 25,
    color: 'black'
  },


});