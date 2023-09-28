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
    const lastPingDate = new Date(lastPing);
    const lastPingSucDate = new Date(lastPingS);
    const lastSyncDate = new Date(lastSync);
    const lastSyncUpDate = new Date(lastSyncUpdate);


    return (    
        <View style={styles.viewStyle}>
            <ViewContainer title={'Client and Player Details'} colour='white' titleColour='white'>
                <Text style={styles.boldText}>Last Ping:</Text>
                <Text style={styles.text}> {
                lastPingDate.getDate() + "/" + lastPingDate.getMonth() + "/" + lastPingDate.getFullYear() + " " +
                lastPingDate.getHours() + ":" + lastPingDate.getMinutes() + ":" + lastPingDate.getSeconds()
                 }</Text>  
                <Text style={styles.boldText}>Last Successfull Ping:</Text>
                <Text style={styles.text}> {
                lastPingSucDate.getDate() + "/" + lastPingSucDate.getMonth() + "/" + lastPingSucDate.getFullYear() + " " +
                lastPingSucDate.getHours() + ":" + lastPingSucDate.getMinutes() + ":" + lastPingSucDate.getSeconds()
                }</Text>  
                <Text style={styles.boldText}>Last Sync:</Text>
                <Text style={styles.text}> {
                lastSyncDate.getDate() + "/" + lastSyncDate.getMonth() + "/" + lastSyncDate.getFullYear() + " " +
                lastSyncDate.getHours() + ":" + lastSyncDate.getMinutes() + ":" + lastSyncDate.getSeconds()
                }</Text>  
                <Text style={styles.boldText}>Last Sync Update:</Text>
                <Text style={styles.text}> {
                lastSyncUpDate.getDate() + "/" + lastSyncUpDate.getMonth() + "/" + lastSyncUpDate.getFullYear() + " " +
                lastSyncUpDate.getHours() + ":" + lastSyncUpDate.getMinutes() + ":" + lastSyncUpDate.getSeconds()
                }</Text>
            </ViewContainer>
            
        </View>
    );
}
export default PingDetails;

const styles = StyleSheet.create({
    text: {
        fontSize: constants.FONTSIZE.EM*2,
        lineHeight: constants.FONTSIZE.EM*3.5,
        
    },
    viewStyle: {
        alignItems: 'center',
        minWidth: 100
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: constants.FONTSIZE.EM*1.3,
    },


});
