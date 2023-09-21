import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";
import constants from "../../constants";



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
            <ViewContainer title={'Client and Player Details'} colour='white' titleColour='white' >
                <Text style={styles.text}><Text style={styles.boldText}>Last Ping:</Text> {lastPing}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>Last Successfull Ping:</Text> {lastPingS}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>Last Sync</Text> {lastSync}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>Last Sync Update</Text> {lastSyncUpdate}</Text>          
            </ViewContainer>
            
        </View>
    );
}
export default PingDetails;

const styles = StyleSheet.create({
    text: {
        fontSize: constants.FONTSIZE.EM,
    },
    viewStyle: {
        alignItems: 'center',
        minWidth: 100
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: constants.FONTSIZE.EM,
    },


});
