import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CONSTANTS from "../../constants";
import { StackNavigationProp } from "@react-navigation/stack";
import EncryptedStorage from "react-native-encrypted-storage";

export type RootStackParamList = {
    Login: undefined;
    Admin: undefined;
    App: undefined;
    Splash: undefined;
};
  
type navProp = StackNavigationProp<RootStackParamList, "Splash">;
  


async function retrieveUserSession() {
    const navigation = useNavigation<navProp>();

    try {   
        let session = await EncryptedStorage.getItem("session_id");
    
        if (session !== undefined) {
            // Congrats! You've just retrieved your first value!
            console.log("THIS RUNS: ", session);
            
            if (session != null) {
                navigation.navigate("Admin");

            } else {
                navigation.navigate("Login");
            }
            
        } 
    } catch (error) {
        // There was an error on the native side
        
    }
}

function Splash(this: any, props: any) {


    const [showingData, setShowingData] = useState(false);

    //const navigation = useNavigation<loginProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const spinValue = new Animated.Value(0);

    retrieveUserSession();
    // First set up animation 

    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true,  // To make use of native driver for performance
            }
        )
    ).start();

    // Check if theres any saved session/email or password data:

    


    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../Images/Lymlive_Iris_login.png')} />
        <Animated.View style={{transform: [{rotateZ: spin}], width: CONSTANTS.FONTSIZE.LOOPING_ANIMATION }}>
            <FontAwesomeIcon  icon={faSpinner} size={CONSTANTS.FONTSIZE.LOOPING_ANIMATION}/>
        </Animated.View>
      </View>
    );


}

export default Splash;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 150,
      backgroundColor: 'white',
    },

    image: {
        margin: CONSTANTS.FONTSIZE.EM*2
    }
  
  });