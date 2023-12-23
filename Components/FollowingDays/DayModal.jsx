import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { utilsReverseDate, convertDayNameFormat } from '../../utils'
import { PanGestureHandler } from 'react-native-gesture-handler'

export default function DayModal({ day, closeModal }) {

    const dayName = convertDayNameFormat(day)
    const dayDate = utilsReverseDate(day.date)

    function handleGestureEvent(event) {
        // Handle the gesture event here
        if (event.nativeEvent.translationY > 15) {
            // Call your function for downward movement
            handleFingerMoveDown();
        }
    };

    function handleFingerMoveDown() {
        // Implement your logic here
        closeModal()
    };

    return (
        <PanGestureHandler onGestureEvent={handleGestureEvent}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.modalContainer}>
                    <View style={styles.topBar}>
                        <Text style={styles.dateText}>{dayName} , {dayDate}</Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                            <Image style={styles.img} source={require("../../assets/cross.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: 320,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',

        shadowColor: "#1E56A0",
        backgroundColor: '#F6F6F6',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 80.78,
        elevation: 70,

        borderWidth: 0.3,
        borderColor: 'lightgrey',
    },
    dateText: {
        padding: 10,
        fontWeight: '600',
        fontSize: 16
    },
    topBar: {
        width: 310,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtn: {
        marginLeft: 'auto',
        padding: 10
    },
    img: {
        width: 25,
        height: 25,
    }
})