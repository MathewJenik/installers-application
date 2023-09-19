import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";



interface MonitoringInformationProps {
    lastPing: string;
    lastPingS: string;
    lastSync: string;
    lastSyncUpdate: string;
}
  
const PingDetails: React.FunctionComponent<MonitoringInformationProps> = ({lastPing = "", lastPingS = "", lastSync="", lastSyncUpdate=""}) => { 
    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (    
        <View style={styles.viewStyle}>
            <ViewContainer title={'Monitoring Information'} colour='white' titleColour='white' >
                <Text>Last Ping: {lastPing}</Text>
                <Text>Last Ping Success: {lastPingS}</Text>
                <Text>Last Sync: {lastSync}</Text>
                <Text>Last Sync Update: {lastSyncUpdate}</Text>
                
            </ViewContainer>
            
        </View>
    );

}
export default PingDetails;




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