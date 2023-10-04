import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeartPulse, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

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


export function Button(props: any) {
    const { onPress, title = '', icon } = props;
    return (
        <Pressable onPress={onPress}>
            <Text style={styles.text}> <FontAwesomeIcon icon={icon} style={{ color: "#ffffff", }} />{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        paddingLeft: 10
    },
    viewStyle: {
        alignItems: 'center',
    },
    blueButton: {
        backgroundColor: '#85c0f9',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 14,
        marginHorizontal: 30,
        textAlign: 'center',
    },
    redButton: {
        backgroundColor: '#d32f2f',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 14,
        marginHorizontal: 30,
        textAlign: 'center',
    }
})

interface ActionsProps {
    devID: string;
    clientID: string;
    interactionable: boolean;
}

const Actions: React.FunctionComponent<ActionsProps> = ({devID = "", clientID = "", interactionable=true})=> {
    
    const [actionsLoading, setActionsLoading] = useState(false);
    const [data, setData] = useState('');

    // The colours for each of the interactable buttons
    const [MIButtonColour, setMIButtonColour] = useState(constants.GREENBUTTONCOLOUR);
    const [RSButtonColour, setRSButtonColour] = useState(constants.BLUEBUTTONCOLOUR);
    const [RBButtonColour, setRBButtonColour] = useState(constants.FADEDBLUEBUTTONCOLOUR);
    


    function makeOpaque() {
        setMIButtonColour(MIButtonColour+"55");
        setRSButtonColour(RSButtonColour+"55");
        setRBButtonColour(RBButtonColour+"55");
    }
    
    function removeOpaque() {
        setMIButtonColour(MIButtonColour.substring(0, MIButtonColour.length-2));
        setRSButtonColour(RSButtonColour.substring(0, RSButtonColour.length-2));
        setRBButtonColour(RBButtonColour.substring(0, RBButtonColour.length-2));
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
        <View style={styles.viewStyle}>

            <ViewContainer title={'Actions'} colour='white' titleColour='white'>
                
            {actionsLoading ? (
                <View style={{minWidth: 320}}>
                <Animated.View style={{transform: [{rotateZ: spin}], width: constants.FONTSIZE.LOOPING_ANIMATION*2, marginLeft: 100, marginBottom: 70, marginTop: 50 }}>
                <FontAwesomeIcon  icon={faSpinner} size={constants.FONTSIZE.LOOPING_ANIMATION*2}/>
                </Animated.View>
                </View>
            ):(
                <>
                <CustomButton title="Mark player as installed" onPress={markInstaller} color={MIButtonColour} iconName="wrench" enabled={interactionable}/>
                <CustomButton title="Re-sync" onPress={resyncDevice} iconName="cloud-download" color={RSButtonColour} enabled={interactionable}/>
                <View style={{ flexDirection: 'row' }}>
                
                    <View>
                        <CustomButton color='#d32f2f' title="Ping" onPress={async () => {
                            setActionsLoading(true);
                            var session = await EncryptedStorage.getItem("session_id");
                            console.log((Number)(devID), (Number)(clientID));
                            let result = await Req.pingMediaPlayer((Number)(devID), (Number)(clientID), (String)(session));
                            console.log(result);
                            setActionsLoading(false);
                        
                        }} faIcon={faHeartPulse}/>
                    </View>

                    <View>
                        <CustomButton color={RBButtonColour} title="Reboot" onPress={async () => {
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
