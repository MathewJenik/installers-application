import React from 'react';
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
        return (
            <View style={styles.viewStyle}>

                <ViewContainer title={'Actions'} colour='white' titleColour='white' >
                    
                    <CustomButton title="Mark player as installed" onPress={() => {}} color="#36bf00" iconName="wrench"/>
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

handleAPI();

function handleAPI() {
    //Display payload
    fetch("https:api.lymlive.com.au/v2/auth/check.iris", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: '20141064@student.westernsydney.edu.au'
        })
    })
    const getAPI = () => {
        return fetch('https:api.lymlive.com.au/v2/auth/check.iris')
            .then(response => response)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.error(error);
            });
    };

    let data = getAPI();
    console.log(data);
}
