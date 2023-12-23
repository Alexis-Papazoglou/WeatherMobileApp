import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { getWeatherIcon } from '../../utils';
import { convertDateFormat,convertDayNameFormat } from '../../utils';

export default function DayForecastCard({ day, index, loc }) {

    const dayName = convertDayNameFormat(day , index)
    const dayDate = convertDateFormat(day.date)
    const condition = day.day.condition // {text: 'Patchy rain possible', icon: '//cdn.weatherapi.com/weather/64x64/day/176.png', code: 1063}
    const minTemp = Math.ceil(day.day.mintemp_c)
    const maxTemp = Math.ceil(day.day.maxtemp_c)

    return (
        <View style={[styles.cardContainer, index === 2 ? styles.borderlast : null]}>
            <Text>{dayName} , {dayDate}</Text>
            <Image style={styles.img} source={{ uri: getWeatherIcon(condition.icon), width: 30, height: 30 }} ></Image>
            <View style={styles.temps}>
                <Text>L : {minTemp}</Text>
                <Text> , </Text>
                <Text>H : {maxTemp}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderBottomWidth: 0.3,
        borderColor:'grey',
        backgroundColor: '#F6F6F6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    borderlast: {
        borderBottomRightRadius: 9,
        borderBottomLeftRadius: 9,
        borderBottomWidth:0
    },
    temps: {
        flexDirection:'row',
        marginLeft: 'auto'
    },
    img: {
        marginLeft:'auto'
    }

})
