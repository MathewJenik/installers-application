import React, { useState } from "react";
import { StyleSheet, Text, View, ViewComponent } from "react-native";
import CustomButton from "../customButton/CustomButton";
import constants from "../../constants";
import { Alert } from 'react-native';
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";


function Help(): any {
    const [showHelp, setShowHelp] = useState(false);
    return (
        <View >
            {showHelp ? (
                <View style={styles.container}>
                    <CustomButton onPress={() => {setShowHelp(false);}} title={"Hide Help"} faIcon={faQuestionCircle} />
                    <View style={styles.helpContainer}>
                        <Text style={styles.text}>On the media player (generally the base), there is a lymlive sticker that contains the name of the client and the name of the screen.{'\n'}
                        Within the top right hand corner of the sticker there is some moretext. The IP address and the MPID are located here. The IP address is recorded next to VIP, and the MPID is recorded next to BID.
                        </Text>
                        
                    </View>
                </View>
            ):(
                <View style={styles.container}>
                    <CustomButton onPress={() => {setShowHelp(true);}} title={"Show Help"} faIcon={faQuestionCircle} />
                </View>
            )}
            
            
        </View>
      );
}

export default Help;



const styles = StyleSheet.create({
    text: {
        padding: constants.HELP.PADDING,
        color: 'white'
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      //marginBottom: constants.FONTSIZE.EM * 2,
      marginBottom: 25,
      backgroundColor: '#e0e0e0',
      
    },
  
    helpContainer: {
        padding: constants.FONTSIZE.EM,
        backgroundColor: "#04abde",
        borderLeftColor: "#2196F3",
        borderLeftWidth: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        color: "#2196F3",
        maxWidth: "90%"
      
  
  
    },
    
  
    loginText: {
      color: 'black',
      alignSelf: 'center',
      verticalAlign: 'auto',
      flex: 1,
      flexDirection: 'column',
      margin: 'auto',
      fontSize: 15,
      paddingHorizontal: 100,
      paddingTop: 200,
      elevation: 0
  
    }
  
  });
