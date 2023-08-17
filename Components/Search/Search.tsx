
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";

import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    color?: string;
    iconName?: string;
    iconColor?: string;
}

const SearchField: React.FC<CustomButtonProps> = ({onPress, title, color ='#04abde', iconName, iconColor = 'white'})=> {

   
        return (

            
            <View style={styles.flexbox}>
    
                <Text style={styles.mytext}>MP Ip address/MPID</Text>

                <View style={styles.container}>
                <TextInput 

                    
                    placeholder="Search by IP or MPID"
                    style={styles.input}
                />
                </View >
                <View >

                <Pressable style={styles.searchBtn} > 
                <View style={styles.clearContainer}>
                <Text style={styles.iconMargin}><FontAwesomeIcon icon={faMagnifyingGlass} style={styles.icon}/>
                </Text>
                   <Text style={styles.searchText}> Search for MP</Text>

                   </View>
                    </Pressable>
               {/*<Button title="Search for MP"  color="#74c365" />*/}
             
                </View>
{/* style={styles.clearButton} */}
                <View>
                    <Pressable style={styles.clearBtn}>
                    <View style={styles.clearContainer}>
                         <Text style={styles.iconMargin}> <FontAwesomeIcon icon={faSquareXmark} style={styles.iconaAlt}/> 
                        </Text>
                        <Text style={styles.cleartext}>
    
                            Clear
                        </Text>
                   
                     </View>  
                    </Pressable>

                {/* <Button title="Clear" color={"orange"} /> */}
                </View>



               
                

            </View>


    
        );
        
    }

    export default SearchField;

    const styles= StyleSheet.create({
        searchBtn: {
            backgroundColor: "#74c365",
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 10,
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            elevation:8,
            margin:11,
            

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
          
    
   
         paddingTop:250,
    
    
          
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
    
    



