import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Locations from './Screens/Locations';
import SpecificLocation from './Screens/SpecificLocation';
import { WeatherProvider } from './Context/WeatherContext';
import { StyleSheet } from 'react-native';
import AddLocation from './Screens/AddLocation';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  StatusBar.setHidden(false)
  StatusBar.setBarStyle('dark-content')

  return (
    <WeatherProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SpecificLocation">
          <Stack.Screen name="SpecificLocation" component={SpecificLocation} />
          <Stack.Screen name="Locations" component={Locations} />
          <Stack.Screen name="AddLocation" component={AddLocation} />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})