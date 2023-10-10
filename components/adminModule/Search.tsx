

import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../customButton/CustomButton";

/**
 * The function initialte the variables that when the buttons either seach or clear are pressed
 * @param 
 * @returns 
 */
interface CustomButtonProps {
    onPress: () => void;
    title: string;
    color?: string;
    iconColor?: string;
    textChangeEvent: (p: any) => void;
    clearTextEvent: () => void;
}

/**
 * this function controls the actions that are done after the search and clear buttons are clicked.
 * @param onPress used to action the click
 * @param title produce the title displayed on the button
 * @param color gives the button its color
 * @param iconColor gives the icon used in the button its color
 * @param textChangeEvent to keep the text in the input field once its written so that it can be saved and used later
 * @param clearTextEvent to clear the text from the text box
 * @returns returns a view of the search button field and the clear button
 */
const SearchField: React.FC<CustomButtonProps> = ({onPress, title, color ='white',  iconColor = 'white', textChangeEvent, clearTextEvent})=> {
    
    const [text, setText] = useState('');
    
    return (
        /**
         * this section displays the search input field and the search button. and helps to keep and store the text in the input field once the user clicked on search
         */
        <View >

            <Text style={styles.mytext}>MP Ip address/MPID</Text>
            <View style={styles.container}>
            <TextInput 
                placeholder="Search by IP or MPID"
                style={styles.input}
                onChangeText={(t) => {textChangeEvent(t); setText(t);}}
               value={text}
            />
            </View >
             {
                /**
                 * this section style the search button and add the icon to it, and activate that it can be pressed
                 */
             }
            <View>
                 
                <View style={styles.searchBtn}>
                    <CustomButton faIcon={faMagnifyingGlass} onPress={onPress} title={'Search For MP'} color="#74c365" textPosition="center"
                    />
                </View>
            </View>
            {
                /**
                 * this section style the Clear button and add the icon to it, and activate that it can be pressed
                 */
             }
            <CustomButton faIcon={faSquareXmark} onPress={() => {clearTextEvent(); setText("");}} title={'Clear'} color="white" textColour="#ff8c00" textPosition="center" iconColor="#ff8c00" enableBorder={true}/>

        </View>

    );
    
}

/** export the function so it can be used in the main program */
export default SearchField;

const styles= StyleSheet.create({
    searchBtn: {
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

    clearBtn:{
        backgroundColor: "white",
        borderWidth:1,
        borderColor: "orange",
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        elevation:8,
        margin:11,  
    },

    
    cleartext: {
        color: "orange",   
        alignSelf:"center",
        marginLeft:5,
    },

    searchText:{
        color: "white", 
        alignSelf:"center",
    },

    container:{
        margin:10,   
    },

    mytext:{
        color:"black",
        fontWeight: 'bold',
        marginLeft:10,
    },

    input:{
        backgroundColor:"#fff",
        padding: 10,  
        color:"#000",
        borderWidth:0.5, 
    },

    button: {
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25, 
        },

    clearButton:{
        color:"#ff8c00",
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.25,
    },

    icon:{
        marginTop:50,
        color:"white",
    },

    iconaAlt:{
        marginTop:2,
        color:"orange",
    },

    clearContainer: {
        alignSelf:"center",
        alignContent: "center",
        flexDirection: "row"
    },

    iconMargin: {
        marginTop: 5,
    },

    iconMarginS: {
        marginTop: 2,
    }
});
