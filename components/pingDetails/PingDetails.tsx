import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";
import constants from "../../constants";
import styling from "../../styling";
import { ViewStyle } from "react-native";

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
        <View style={styling.Styles.Card_Style as ViewStyle}>
            <ViewContainer title={'Ping Details'} colour='white' titleColour='white'>
                <Text style={styling.Styles.Bold_Text}>Last Ping:</Text>
                <Text style={styling.Styles.Text_Size_1}> {
                lastPingDate.getDate() + "/" + (lastPingDate.getMonth() + 1) + "/" + lastPingDate.getFullYear() + " " +
                lastPingDate.getHours() + ":" + lastPingDate.getMinutes() + ":" + lastPingDate.getSeconds()
                 }</Text>  
                <Text style={styling.Styles.Bold_Text}>Last Successfull Ping:</Text>
                <Text style={styling.Styles.Text_Size_1}> {
                lastPingSucDate.getDate() + "/" + (lastPingSucDate.getMonth() + 1) + "/" + lastPingSucDate.getFullYear() + " " +
                lastPingSucDate.getHours() + ":" + lastPingSucDate.getMinutes() + ":" + lastPingSucDate.getSeconds()
                }</Text>  
                <Text style={styling.Styles.Bold_Text}>Last Sync:</Text>
                <Text style={styling.Styles.Text_Size_1}> {
                lastSyncDate.getDate() + "/" + (lastSyncDate.getMonth() + 1) + "/" + lastSyncDate.getFullYear() + " " +
                lastSyncDate.getHours() + ":" + lastSyncDate.getMinutes() + ":" + lastSyncDate.getSeconds()
                }</Text>  
                <Text style={styling.Styles.Bold_Text}>Last Sync Update:</Text>
                <Text style={styling.Styles.Text_Size_1}> {
                lastSyncUpDate.getDate() + "/" + (lastSyncUpDate.getMonth() + 1) + "/" + lastSyncUpDate.getFullYear() + " " +
                lastSyncUpDate.getHours() + ":" + lastSyncUpDate.getMinutes() + ":" + lastSyncUpDate.getSeconds()
                }</Text>
            </ViewContainer>
            
        </View>
    );
}
export default PingDetails;

