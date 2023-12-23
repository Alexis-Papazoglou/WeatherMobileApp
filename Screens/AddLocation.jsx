import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useWeatherContext } from '../Context/WeatherContext'
import { city } from '../Cities.js'
import NavigationBar from '../Components/NavigationBar'

export default function AddLocation({ navigation }) {

    const { addLocation, selectedLocation, setSelectedLocation, geoLocation } = useWeatherContext()
    const [text, setText] = useState()
    const [suggestions, setSuggestions] = useState([])
    const suggestionList = city //from file

    const handleTextChange = (value) => {
        setText(value)
        if (value.length >= 2) {
            const sortedSuggestions = suggestionList
                .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
                .sort((a, b) => a.indexOf(value) - b.indexOf(value))
                .slice(0, 6)
            setSuggestions(sortedSuggestions)
        } else {
            setSuggestions([]) // Clear suggestions if the input is less than 3 characters
        }
    }

    const handleSuggestionSelect = (selectedSuggestion) => {
        setText(selectedSuggestion)
        setSuggestions([]) // Clear suggestions
    }

    function handleAddGeolocationToLocations() {
        //geolocation does not update if it is not assigned yet
        if (geoLocation !== null) {
            updateLocations(geoLocation)
        }
        else {
            console.log('(AddLocation): Issue adding Geolocation to locations, Try again after making sure you give the right privilages to the application (geoLocation === null) for some reason')
        }
    }


    function handleSubmit() {
        updateLocations(text)
    }

    function updateLocations(loc) {
        if (selectedLocation === 'none') {
            addLocation(loc)
            setSelectedLocation(loc)
            navigation.navigate('SpecificLocation')
        } else {
            addLocation(loc)
            navigation.navigate('Locations')
        }
    }

    return (
        <View style={styles.formCont}>
            <View style={styles.form}>
                <TouchableOpacity
                    style={[
                        styles.addBtn,
                        styles.addCurrent,
                        !geoLocation
                            ? styles.disabledButton // Style for disabled state
                            : null // Style for enabled state
                    ]}
                    onPress={handleAddGeolocationToLocations}
                    disabled={!geoLocation}
                >
                    <Text style={[styles.add, styles.addCurrentBtn]}>
                        {geoLocation
                            ? `Add current: ${geoLocation}`
                            : "Wait for geolocation please..."
                        }
                    </Text>
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.inputform}
                        placeholder="Enter location.."
                        onChangeText={handleTextChange}
                        value={text}
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={handleSubmit}>
                        <Text style={styles.add}>Add</Text>
                    </TouchableOpacity>

                </View>
                {suggestions.length > 0 && (
                    <FlatList
                        style={styles.suggestions}
                        data={suggestions}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.listItems} onPress={() => handleSuggestionSelect(item)}>
                                <Text style={styles.sText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
            <View style={styles.navigationContainer}>
                <NavigationBar navigation={navigation} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formCont: {
        flex: 1,
        backgroundColor: '#F1F6F5'
    },
    form: {
        flex: 1,
        position: 'relative',
        marginTop: 30,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    inputform: {
        backgroundColor: 'white',
        width: 280,
        height: 50,
        padding: 10,
        borderRadius: 10,
    },
    suggestions: {
        position: 'relative',
        top: 5,
        left: 15
    },
    listItems: {
        backgroundColor: 'white',
        width: 150,
        margin: 2,
        padding: 5,
        borderRadius: 20
    },
    sText: {
        color: 'grey'
    },
    add: {
        fontSize: 20,
        color: '#F1F6F5'
    },
    addBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#1E56A0',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#472183',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#1E56A0",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 11.78,
        elevation: 15
    },
    addCurrent: {
        alignSelf: 'center',
        margin: 10,
    },
    addCurrentBtn: {
        padding: 4,
    },
    disabledButton:{
        backgroundColor:'grey'
    }
})