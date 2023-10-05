import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCloudDownload, faHeartPulse, faSpinner, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styling from "../../styling";
import { ViewStyle } from "react-native";

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Alert,
    Pressable,
    ToastAndroid,
    Animated,
    Easing,
} from 'react-native';
import CustomButton from '../customButton/CustomButton';
import ViewContainer from '../viewContainer/ViewContainer';
import Req from '../../request/Request';
import { err } from 'react-native-svg/lib/typescript/xml';
import EncryptedStorage from 'react-native-encrypted-storage';
import request from '../../request/Request';
import constants from '../../constants';


const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        paddingLeft: 10
    },
})

interface ActionsProps {
    devID: string;
    clientID: string;
    interactionable: boolean;
}

const Actions: React.FunctionComponent<ActionsProps> = ({devID = "", clientID = "", interactionable=true})=> {
    
    const [actionsLoading, setActionsLoading] = useState(false);
    const [data, setData] = useState('');
    var alpha = 1.0;
    // The colours for each of the interactable buttons
    const [MIButtonColour, setMIButtonColour] = useState('rgba('+constants.RGB.GREENBUTTONCOLOUR.RED+',' + constants.RGB.GREENBUTTONCOLOUR.GREEN +',' + constants.RGB.GREENBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
    const [RSButtonColour, setRSButtonColour] = useState('rgba('+constants.RGB.BLUEBUTTONCOLOUR.RED+',' + constants.RGB.BLUEBUTTONCOLOUR.GREEN +',' + constants.RGB.BLUEBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
    const [RBButtonColour, setRBButtonColour] = useState('rgba('+constants.RGB.FADEDBLUEBUTTONCOLOUR.RED+',' + constants.RGB.FADEDBLUEBUTTONCOLOUR.GREEN +',' + constants.RGB.FADEDBLUEBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
    


    function makeOpaque() {
        alpha = 0.5;
        setMIButtonColour('rgba('+constants.RGB.GREENBUTTONCOLOUR.RED+',' + constants.RGB.GREENBUTTONCOLOUR.GREEN +',' + constants.RGB.GREENBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
        setRSButtonColour('rgba('+constants.RGB.BLUEBUTTONCOLOUR.RED+',' + constants.RGB.BLUEBUTTONCOLOUR.GREEN +',' + constants.RGB.BLUEBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
        setRBButtonColour('rgba('+constants.RGB.FADEDBLUEBUTTONCOLOUR.RED+',' + constants.RGB.FADEDBLUEBUTTONCOLOUR.GREEN +',' + constants.RGB.FADEDBLUEBUTTONCOLOUR.BLUE+' , '+ alpha + ')');
        console.log("COLOUR: ", MIButtonColour);
    }
    
    function removeOpaque() {
        alpha = 1.0;
        setMIButtonColour('rgba('+constants.RGB.GREENBUTTONCOLOUR.RED+',' + constants.RGB.GREENBUTTONCOLOUR +',' + constants.RGB.GREENBUTTONCOLOUR+' , '+ alpha + ')');
        setRSButtonColour('rgba('+constants.RGB.BLUEBUTTONCOLOUR.RED+',' + constants.RGB.BLUEBUTTONCOLOUR +',' + constants.RGB.BLUEBUTTONCOLOUR+' , '+ alpha + ')');
        setRBButtonColour('rgba('+constants.RGB.FADEDBLUEBUTTONCOLOUR.RED+',' + constants.RGB.FADEDBLUEBUTTONCOLOUR +',' + constants.RGB.FADEDBLUEBUTTONCOLOUR+' , '+ alpha + ')');
    }

    // Used for onload selection of the current orientation.
    useEffect(() => {

        // set all the colours to be opaque.
        if (interactionable == false) {
            makeOpaque();


        } else {
            removeOpaque();
        }

    }, [interactionable]
    );

    


  


  // Spinning animatiion:
  const spinValue = new Animated.Value(0);
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

    const markInstaller = async () => {
        try{
            console.log("DEVICE ID: ", devID);
            const sessionID = await EncryptedStorage.getItem("session_id");
            
            console.log("Session ID: ", (String)(sessionID));
            let results = await Req.markAsInstalled(Number(devID), Number(clientID), (String)(sessionID));
            
            // Assuming the API responding the button if the device is installed and ready to be marked
            if(results.error == false)
            {
                console.log("Marking Device Installation Success", sessionID);
                Alert.alert("Device Marked as Installed.");
            }
            else
            {
                console.log("Device Failed to Marked", results.errorMsg);
                Alert.alert(results.errorMsg);
            }


        } catch {
            console.log("Error!");
        }
    }
    
    const resyncDevice = async () => {
        try{
            setActionsLoading(true);
            console.log("DEVICE ID: ", devID);
            const sessionID = await EncryptedStorage.getItem("session_id");
            
            console.log("Session ID: ", (String)(sessionID));
            let results = await Req.resyncDevice(Number(devID), Number(clientID), (String)(sessionID));
            
            // Updating the results based what the player stands for
            setData(results);

            // Displays the updated data
            console.log("Updated Data", results)
        } catch {
            console.log("Error!");
        } finally{
            setActionsLoading(false);
        }
    }


    return (
        <View style={styling.Styles.Card_Style as ViewStyle}>

            <ViewContainer title={'Actions'} colour='white' titleColour='white'>
                
            {actionsLoading ? (
                <View style={{minWidth: 320}}>
                <Animated.View style={{transform: [{rotateZ: spin}], width: constants.FONTSIZE.LOOPING_ANIMATION*2, marginLeft: 100, marginBottom: 70, marginTop: 50 }}>
                <FontAwesomeIcon  icon={faSpinner} size={constants.FONTSIZE.LOOPING_ANIMATION*2}/>
                </Animated.View>
                </View>
            ):(
                <>
                <CustomButton title="Mark player as installed" onPress={markInstaller} rgbaColour={MIButtonColour} faIcon={faWrench} enabled={interactionable}/>
                <CustomButton title="Re-sync" onPress={resyncDevice} faIcon={faCloudDownload} rgbaColour={RSButtonColour} enabled={interactionable}/>
                <View style={{ flexDirection: 'row' }}>
                
                {
                    // Displays ping button and handles functionality when clicked.
                }
                    <View>
                        <CustomButton rgbaColour='#d32f2f' title="Ping" onPress={async () => {
                            setActionsLoading(true);
                            var session = await EncryptedStorage.getItem("session_id");
                            console.log((Number)(devID), (Number)(clientID));
                            let result = await Req.pingMediaPlayer((Number)(devID), (Number)(clientID), (String)(session));
                            console.log(result);
                            setActionsLoading(false);
                        
                        }} faIcon={faHeartPulse}/>
                    </View>

                {
                    // Displays reboot button and handles functionality when clicked. 
                }
                    <View>
                        <CustomButton rgbaColour={RBButtonColour}  title="Reboot" onPress={async () => {
                            setActionsLoading(true);
                            var session = await EncryptedStorage.getItem("session_id");
                            console.log((Number)(devID), (Number)(clientID));
                            let result = await Req.rebootMediaPlayer((Number)(devID), (Number)(clientID), (String)(session));
                            console.log(result);
                            setActionsLoading(false);

                        }} faIcon={faRotateLeft} enabled={interactionable} />
                    </View>
                </View>
                </>
            )}

            </ViewContainer>

        </View>
    );
}
export default Actions;
