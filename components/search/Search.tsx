
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";

import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../customButton/CustomButton";
import Req from "../../request/Request";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    color?: string;
    iconName?: string;
    iconColor?: string;
    textChangeEvent: (p: any) => void;
}

const SearchField: React.FC<CustomButtonProps> = ({onPress, title, color ='white', iconName, iconColor = 'white', textChangeEvent})=> {
    
    const [text, setText] = useState('');

    
    return (
        <View style={styles.flexbox}>

            <Text style={styles.mytext}>MP Ip address/MPID</Text>
            <View style={styles.container}>
            <TextInput 
                placeholder="Search by IP or MPID"
                style={styles.input}
                onChangeText={(t) => {textChangeEvent(t); setText(t);}}
               value={text}
            />
            </View >
            <View>
                <View style={styles.searchBtn}>
                    <CustomButton faIcon={faMagnifyingGlass} onPress={onPress} title={'Search For MP'} color="#74c365" textPosition="center"
                    />
                </View>
            </View>
            <CustomButton faIcon={faSquareXmark} onPress={() => {setText("")}}title={'Clear'} color="white" textColour="#ff8c00" textPosition="center" iconColor="#ff8c00" enableBorder={true}/>

        </View>

    );
    
}
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
        margin:10
        
    },

    flexbox: {

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