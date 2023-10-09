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
import Req from "../../request/Request";

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
        let email = await EncryptedStorage.getItem("user_email");
        let pass = await EncryptedStorage.getItem("user_password");
    
        if (session !== undefined) {
            if (session != null) {
                // check the session to see if its valid:
                let result = await Req.isUserLoggedIn(session);

                // if it is still valid, navigate to Admin.
                if (result == true) {
                    navigation.navigate("Admin");
                } else {
                    // attempt to log the user back in with the saved user details.
                    if (email != undefined && pass != undefined) {
                        let loginRes = await Req.loginAdhoc(email, pass);
                        
                        // if login is successfull navigate to admin page
                        if (loginRes == true) {
                            navigation.navigate("Admin");

                        } else {
                            // if login fails, go back to login page.
                            navigation.navigate("Login");
                        }
                    } else {
                    // if the login doesnt work, go back to the login page.
                        navigation.navigate("Login");
                    }
                }
            } else {
                // if there is no session token, go straight to the login page.
                navigation.navigate("Login");
            }
        } else {
            navigation.navigate("Login");
        } 
    } catch (error) {
        // There was an error on the native side
        console.log(error);

        // navigate to the login screen
        navigation.navigate("Login");
        
    }
}

function Splash(this: any, props: any) {


    const [showingData, setShowingData] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const spinValue = new Animated.Value(0);

    retrieveUserSession();

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    // setup the animation for the spinning loading bar.
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear, 
                useNativeDriver: true,  
            }
        )
    ).start();


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