import { StyleSheet, Text, TouchableOpacity, View , Modal} from 'react-native'
import React, { useState } from 'react'
import DayForecastCard from './DayForecastCard'
import DayModal from './DayModal'

export default function FollowingDaysCardsContainer({ data }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData,setModalData] = useState()
    const days = (data.forecast.forecastday)

    function openModal(day){
        setModalVisible(true)
        setModalData(day)
    }

    function closeModal(){
        setModalVisible(false)
    }

    return (
        <View style={styles.dayForecastContainer}>
            <View style={styles.dayForecastTextContainer}>
                <Text style={styles.dayForecastText}>Next days for {data.location.name}</Text>
            </View>
            {days.map((day, index) => {
                return <TouchableOpacity key={index} onPress={() => openModal(day)}><DayForecastCard index={index} day={day} loc={data.location.name}></DayForecastCard></TouchableOpacity>
            })}
            <View style={styles.modal}>
                <Modal
                    animationType="slide" 
                    transparent={true}
                    visible={modalVisible}
                    style={styles.modal}
                >
                    <DayModal day={modalData} closeModal={closeModal}></DayModal>
                </Modal>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    dayForecastContainer: {
        width: 350,
        marginTop: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        shadowColor: "#1E56A0",
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 11.78,
        elevation: 15
    },
    dayForecastText: {
        padding: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#472183'
    },
    dayForecastTextContainer: {
        borderBottomWidth: 0.5,
        backgroundColor: '#D6E4F0',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    modal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})