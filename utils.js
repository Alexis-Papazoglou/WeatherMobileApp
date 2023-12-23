import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { useWeatherContext } from './Context/WeatherContext'

const GEO_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

export function getWeatherIcon(uri) {
    const icon = uri.slice(2)
    return ('https://' + icon)
}

//please check if Geolocation is not null if you use it to prevent bugs
export function utilsSetUserGeoloc() {

    const { geoLocation, setGeoLocation } = useWeatherContext()
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function sliceRes(resault) {
        //i want to check if geolocation is assigned before i set the state of it
        if (location !== null && resault !== null) {
            console.log('Resault was :', resault)
            let str = resault.split(' ')[0]
            return (str)
        }
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    if (location !== null && geoLocation === null) {

        var lat = (location.coords.latitude)
        var long = (location.coords.longitude)

        if (typeof lat === 'number' && typeof long === 'number') {

            var requestOptions = {
                method: 'GET',
            };

            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${GEO_API_KEY}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setGeoLocation(sliceRes(result.features[0].properties.city))
                })
                .catch(error => console.log('error', error));
        } else {
            console.log('Something Wrong with Lat and Long cordinates (NaN)')
        }

    }
    else {
        console.log('(utils) : Geolocation is :', geoLocation);
    }
}

export function convertDayNameFormat(inputDate , index) {

    if (index === 0) {
        return 'Today'
    }

    const dateParts = inputDate.date.split('-');
    if (dateParts.length !== 3) {
        return 'Invalid Date';
    }

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return 'Invalid Date';
    }

    const date = new Date(year, month, day);
    const options = { weekday: 'long' };

    const dayNameWithYear = date.toLocaleDateString('en-US', options);
    const dayNameWithoutYear = dayNameWithYear.split(',')[0]; // Extract only the day of the week

    return dayNameWithoutYear;
}

export function convertDateFormat(inputDate) {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
        return 'Invalid Date';
    }

    const day = parts[2];
    const month = parts[1];

    return `${day}/${month}`;
}

export function utilsReverseDate(inputDate) {
    const parts = inputDate.split('-');
    if (parts.length !== 3) {
        return 'Invalid Date';
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0]

    return `${day}/${month}/${year}`;
}