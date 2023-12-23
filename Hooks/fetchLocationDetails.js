import { useEffect, useState } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY; 
const API_URL = 'http://api.weatherapi.com/v1/forecast.json'; 

const fetchLocationDetails = (location) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Make an API request to fetch location details
                const response = await fetch(`${API_URL}?key=${API_KEY}&q=${location}&days=3&aqi=no&alerts=no`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                setData(result);
                setError(null);
            } catch (error) {
                setData(null);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (location) {
            fetchData();
        }
    }, [location]);

    //console.log('(fetch hook)', data)

    return { data, loading, error };
};

export default fetchLocationDetails;
