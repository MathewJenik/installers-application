import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCloudDownload, faHeartPulse, faSpinner, faWrench } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import styling from "../../styling";
import { Button, ViewStyle } from "react-native";

import {
    StyleSheet,
    View,
    Animated,
    Easing,
} from 'react-native';
import CustomButton from '../customButton/CustomButton';
import CardContainer from '../cardContainer/CardContainer';
import Req from '../../request/Request';
import { err } from 'react-native-svg/lib/typescript/xml';
import EncryptedStorage from 'react-native-encrypted-storage';
import request from '../../request/Request';
import constants from '../../constants';
import CustomAlert from '../customAlert/CustomAlert';

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


    // string variables for the button colours, used when changing the opacity.
    var MIColourString = "rgba("+constants.RGB.GREENBUTTONCOLOUR.RED+"," + constants.RGB.GREENBUTTONCOLOUR.GREEN +"," + constants.RGB.GREENBUTTONCOLOUR.BLUE + ", "
    var RSColourString = "rgba("+constants.RGB.BLUEBUTTONCOLOUR.RED+"," + constants.RGB.BLUEBUTTONCOLOUR.GREEN +"," + constants.RGB.BLUEBUTTONCOLOUR.BLUE + ", "
    var RBColourString = "rgba("+constants.RGB.BLUEBUTTONCOLOUR.RED+"," + constants.RGB.BLUEBUTTONCOLOUR.GREEN +"," + constants.RGB.BLUEBUTTONCOLOUR.BLUE + ", "

    // The colours for each of the interactable buttons
    const [MIButtonColour, setMIButtonColour] = useState(MIColourString + alpha + ")");
    const [RSButtonColour, setRSButtonColour] = useState(RSColourString + alpha + ")");
    const [RBButtonColour, setRBButtonColour] = useState(RBColourString + ")");
    const [PingButtonColour, setPingButtonColour] = useState(constants.HEX.REDBUTTON);

    function makeOpaque() {
        alpha = 0.5;
        setMIButtonColour(MIColourString + alpha + ")");
        setRSButtonColour(RSColourString + alpha + ")");
        setRBButtonColour(RBColourString + alpha + ")");
        setPingButtonColour(constants.HEX.REDBUTTON);
        console.log("COLOUR: ", MIButtonColour);
    }
    
    function removeOpaque() {
        alpha = 1.0;
        setMIButtonColour(MIColourString + alpha + ")");
        setRSButtonColour(RSColourString + alpha + ")");
        setRBButtonColour(RBColourString + alpha + ")");
        setPingButtonColour(constants.HEX.GREENBUTTONCOLOUR);
        console.log("COLOURS: ");
        console.log(MIButtonColour);
        console.log(RSButtonColour);
        console.log(RBButtonColour);
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
    
    const resyncDevice = async () => {
        setActionsLoading(true);
        console.log("DEVICE ID: ", devID);
        const sessionID = await EncryptedStorage.getItem("session_id");
        
        console.log("Session ID: ", (String)(sessionID));
        let results = await Req.resyncDevice(Number(devID), Number(clientID), (String)(sessionID));
        
        // Updating the results based what the player stands for
        setData(results);
        showAlert();
        // Displays the updated data
        console.log("Updated Data", results)
    }

    const markInstaller = async () => {
        console.log("DEVICE ID: ", devID);
        const sessionID = await EncryptedStorage.getItem("session_id");
        
        console.log("Session ID: ", (String)(sessionID));
        let results = await Req.markAsInstalled(Number(devID), Number(clientID), (String)(sessionID));
        
        // Assuming the API responding the button if the device is installed and ready to be marked
        if(results.results == false)
        {
            console.log("Marking Device Installation Success", sessionID);
            showAlert();
        }
        else
        {
            console.log("Device Failed to Marked", results.errorMsg);
        }
    }

    const ping = async () => {
        setActionsLoading(true);
        var session = await EncryptedStorage.getItem("session_id");
        console.log((Number)(devID), (Number)(clientID));
        let result = await Req.pingMediaPlayer((Number)(devID), (Number)(clientID), (String)(session));
        console.log(result);

        if (result.result == true) {
            showAlert();
            removeOpaque();
        } else {
            makeOpaque();
        }

        // currently the api does not mark the ping result as true if it is successfull, so for now only check if theres an error.
        if (result.error == false) {
            removeOpaque()
        } else {
            makeOpaque();
        }

        setActionsLoading(false);
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const showAlert = () => {
      setModalVisible(true);
    };
  
    const hideAlert = () => {
      setModalVisible(false);
    };



    return (
        <View style={styling.Styles.Card_Style as ViewStyle}>
            <CardContainer title={'Actions'} colour='white' titleColour='white'>
                
            {actionsLoading ? (
                <View style={{minWidth: 320}}>
                <Animated.View style={{transform: [{rotateZ: spin}], width: constants.FONTSIZE.LOOPING_ANIMATION*2, marginLeft: 100, marginBottom: 70, marginTop: 50 }}>
                <FontAwesomeIcon  icon={faSpinner} size={constants.FONTSIZE.LOOPING_ANIMATION*2}/>
                </Animated.View>
                </View>
            ):(
                <>
                <CustomButton title="Mark player as installed" onPress={markInstaller} color={MIButtonColour} faIcon={faWrench} enabled={interactionable}/>
                <CustomButton color={PingButtonColour} title="Ping" onPress={ping} faIcon={faHeartPulse}/>
                <View style={{ flexDirection: 'row' }}>
                
                {
                    // Displays ping button and handles functionality when clicked.
                }
                    <View style={{flex: 1}}>
                        <CustomButton title="Re-sync" onPress={resyncDevice} faIcon={faCloudDownload} color={RSButtonColour} enabled={interactionable}/>
                    </View>

                {
                    // Displays reboot button and handles functionality when clicked. 
                }
                    <View style={{flex: 1}}>
                        <CustomButton color={RBButtonColour}  title="Reboot" onPress={async () => {
                            setActionsLoading(true);
                            var session = await EncryptedStorage.getItem("session_id");
                            console.log((Number)(devID), (Number)(clientID));
                            let result = await Req.rebootMediaPlayer((Number)(devID), (Number)(clientID), (String)(session));
                            console.log(result);
                            setActionsLoading(false);
                            showAlert();
                        }} faIcon={faRotateLeft} enabled={interactionable} />
                    </View>
                </View>
                </>
            )}

            </CardContainer>
            <CustomAlert isVisible={isModalVisible} title="SUCCESS" message={"The action has been successful"} onClose={hideAlert}></CustomAlert>
        </View>
    );
}
export default Actions;
