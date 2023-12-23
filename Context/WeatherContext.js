// WeatherContext.js
import { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [locations, setLocations] = useState(['Thessaloniki']);
  const [geoLocation , setGeoLocation] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(() => {
    if(locations[0]){
      return locations[0]
    }
    else{
      return 'none'
    }
  });

  const addLocation = (location) => {
    if(!locations.includes(location)){
      setLocations([...locations, location]);
      if(location === geoLocation){
        console.log('(context) : Geolocation added to locations!');
      }
    }else{
      console.log('(context) : location already exists')
    }
  };
  
  return (
    <WeatherContext.Provider
      value={{ locations, selectedLocation, addLocation , setSelectedLocation , geoLocation , setGeoLocation}}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);
