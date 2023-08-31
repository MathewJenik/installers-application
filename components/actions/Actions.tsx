import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';
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
} from 'react-native';
import CustomButton from '../customButton/CustomButton';
import ViewContainer from '../viewContainer/ViewContainer';
import Req from '../../request/Request';
import { err } from 'react-native-svg/lib/typescript/xml';
import EncryptedStorage from 'react-native-encrypted-storage';

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
}

const Actions: React.FunctionComponent<ActionsProps> = ({devID = "", clientID = ""})=> {
    
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
                ToastAndroid.showWithGravity("Device Marked as Installed.", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
            else
            {
                console.log("Device Failed to Marked", results.errorMsg);
                ToastAndroid.showWithGravity(results.errorMsg, ToastAndroid.LONG, ToastAndroid.CENTER);
            }


        } catch {
            console.log("Error!");
        }
    }

    return (
        <View style={styles.viewStyle}>

            <ViewContainer title={'Actions'} colour='white' titleColour='white' >
                
                <CustomButton title="Mark player as installed" onPress={markInstaller} color="#36bf00" iconName="wrench"/>
                <CustomButton title="Re-sync" onPress={() => {}} iconName="cloud-download" />
                <View style={{ flexDirection: 'row' }}>
                
                    <View>
                        <CustomButton color='#d32f2f' title="Ping" onPress={() => {}} faIcon={faHeartPulse}/>
                    </View>

                    <View>
                        <CustomButton color='#85c0f9' title="Reboot" onPress={() => {}} iconName="rotate-left" />
                    </View>
                </View>
            </ViewContainer>

        </View>
    );
}
export default Actions;
