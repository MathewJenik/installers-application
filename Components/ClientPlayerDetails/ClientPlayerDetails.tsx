import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";



interface MonitoringInformationProps {
    clientName: string;
    clientNumber: string;

    mediaName: string;
    ipAddres: string;
    mpbid: string;
}
  
const ClientPlayerDetails: React.FunctionComponent<MonitoringInformationProps> = ({clientName = "", clientNumber = "", mediaName="", ipAddres="", mpbid=""}) => { 
    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (    
        <View style={styles.viewStyle}>
            <ViewContainer title={'Client and Player Details'} colour='white' titleColour='white' >
                <Text>Client</Text>     
                <Text>Name: {clientName}</Text>  
                <Text>Client Number: {clientNumber}</Text>  
                <Text>Media Player</Text>  
                <Text>Name: {mediaName}</Text>  
                <Text>IP Address: {ipAddres}</Text>  
                <Text>MPBID: {mpbid}</Text>             
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
        minWidth: 100
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
