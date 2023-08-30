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
} from 'react-native';
import CustomButton from '../customButton/CustomButton';
import ViewContainer from '../viewContainer/ViewContainer';
import Req from '../../request/Request';
import { err } from 'react-native-svg/lib/typescript/xml';

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

export default class Actions extends React.Component {
    render() {
        const [deviceID, setdeviceID] = useState('');
        const [clientID, setclientID] = useState('');
        const [sessionID, setsessionID] = useState('');

        return (
            <View style={styles.viewStyle}>

                <ViewContainer title={'Actions'} colour='white' titleColour='white' >
                    
                    <CustomButton title="Mark player as installed" onPress={async () => {
                        try{
                            let markAsInstalledCheck = await Req.markAsInstalled(Number(deviceID), Number(clientID), sessionID);
                            
                            // Assuming the API responding the button if the device is installed and ready to be marked
                            if(markAsInstalledCheck.valid)
                            {
                                console.log("Marking Device Installation Success", sessionID);
                            }
                            else
                            {
                                console.log("Device Failed to Marked", markAsInstalledCheck.errorMsg);
                            }
                        } catch {
                            console.log("Error!");
                        }
                    }} color="#36bf00" iconName="wrench"/>
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
}

