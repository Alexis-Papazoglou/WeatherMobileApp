import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { getWeatherIcon } from '../utils';

export default function FollowingHoursSingleCard({ hourData, exactTime }) {
    const [currentTime, setcurrentTime] = useState(compareTime())
    const condition = (hourData.condition);
    const time = extractTimeFromDateTime(hourData.time)
    const temperature = (hourData.temp_c);


    //edw ftanei lathos i timi hour data 

    //checks if the current card needs to be more blue if the time is in current hour range
    function compareTime() {
        const [hoursDataDate, hoursDataTime] = hourData.time.split(' ');
        const [exactTimeDate, exactTimeTime] = exactTime.split(' ');

        const [hoursDataHour, hoursDataMinutes] = hoursDataTime.split(':');
        const [exactTimeHour, exactTimeMinutes] = exactTimeTime.split(':');

        // Convert the time parts to numbers
        const hoursDataHourNum = parseInt(hoursDataHour);
        const exactTimeHourNum = parseInt(exactTimeHour);

        // Check if exactTimeHourNum falls within the hour of hoursData
        if (exactTimeHourNum + 1 === hoursDataHourNum) {
            return true
        } else {
            return false
        }
    }

    function extractTimeFromDateTime(dateTimeString) {

        const parts = dateTimeString.split(' ');
        if (parts.length === 2) {
            const timePart = parts[1];
            const [hours, minutes] = timePart.split(':');
            let period = 'AM';
            let formattedHours = parseInt(hours);

            if (formattedHours === 0) {
                formattedHours = 12;
            } else if (formattedHours >= 12) {
                formattedHours = formattedHours > 12 ? formattedHours - 12 : formattedHours;
                period = 'PM';
            }

            // Convert the hours back to string and add leading zero if needed
            formattedHours = formattedHours.toString().padStart(2, '0');

            const formattedTime = `${formattedHours}:${minutes} ${period}`;
            return formattedTime;
        }
        return ''; // Return an empty string if the input format is not as expected
    }

    return (
        <View style={[styles.card, currentTime && styles.currentCard]}>
            <Text style={styles.timeText}>{time}</Text>
            <Image source={{ uri: getWeatherIcon(condition.icon), width: 50, height: 50 }} ></Image>
            <Text style={styles.tempText}>{temperature} °C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    timeText: {
        textAlign: 'center',
        padding:2,
        fontSize: 12
    },
    tempText: {
        textAlign: 'center',
        fontSize: 12,
        padding:2,
    },
    card: {
        backgroundColor:'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginVertical: 5,
        marginHorizontal:3,
        borderWidth: 0.3,
        borderRadius: 10,
        borderColor: 'lightgrey',

        shadowColor: "#1E56A0",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 11.78,
        elevation: 15
    },

    currentCard: {
        backgroundColor: '#dff0ff'
    }

})