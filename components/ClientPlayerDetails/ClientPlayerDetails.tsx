import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";
import SearchField from '../search/Search';
import AdminModule from "../adminModule/AdminModule";
import Req from '../../request/Request';
import EncryptedStorage from 'react-native-encrypted-storage';
import PingDetails from "../pingDetails/PingDetails";
import { SearchBar } from "react-native-screens";




function ClientPlayerDetails(): any {

    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();
    return (    
        <View style={styles.viewStyle}>
            <ViewContainer title={'Client and Player Details'} colour='white' titleColour='white' >
                <Text>Client</Text> 
                <Text>Name: </Text>
                <Text>Client Number: </Text>
                <Text>Media Player</Text>
                <Text>Name: </Text>
                <Text>IP Address: </Text>
                <Text>MPBID: </Text>
            </ViewContainer>
            
        </View>
    );

}
export default ClientPlayerDetails;

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