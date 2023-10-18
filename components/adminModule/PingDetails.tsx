import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CardContainer from "../cardContainer/CardContainer";
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
    var lastPingDate = new Date(lastPing);
    var lastPingSucDate = new Date(lastPingS);
    var lastSyncDate = new Date(lastSync);
    var lastSyncUpDate = new Date(lastSyncUpdate);


    return (    
        <View style={[styling.Styles.Card_Style as ViewStyle]}>
            <CardContainer title={'Ping Details'} colour='white' titleColour='white'>
                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3]}>Last Ping:</Text>
                <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{
                String(lastPingDate.getDate()).padStart(2, "0") + "/" + String(lastPingDate.getMonth() + 1).padStart(2, "0") + "/" + lastPingDate.getFullYear() + " " +
                String(lastPingDate.getHours()).padStart(2, "0") + ":" + String(lastPingDate.getMinutes()).padStart(2, "0") + ":" + String(lastPingDate.getSeconds()).padStart(2, "0")

                 }</Text>  
                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3, {paddingTop:constants.FONTSIZE.EM*0.5}]}>Last Successful Ping:</Text>
                <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{
                String(lastPingSucDate.getDate()).padStart(2, "0") + "/" + String(lastPingSucDate.getMonth() + 1).padStart(2, "0") + "/" + lastPingSucDate.getFullYear() + " " +
                String(lastPingSucDate.getHours()).padStart(2, "0") + ":" + String(lastPingSucDate.getMinutes()).padStart(2, "0") + ":" + String(lastPingSucDate.getSeconds()).padStart(2, "0")
                }</Text>  
                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3, {paddingTop:constants.FONTSIZE.EM*0.5}]}>Last Sync:</Text>
                <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{
                String(lastSyncDate.getDate()).padStart(2, "0") + "/" + String(lastSyncDate.getMonth() + 1).padStart(2, "0") + "/" + lastSyncDate.getFullYear() + " " +
                String(lastSyncDate.getHours()).padStart(2, "0") + ":" + String(lastSyncDate.getMinutes()).padStart(2, "0") + ":" + String(lastSyncDate.getSeconds()).padStart(2, "0")
                }</Text>  
                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3, {paddingTop:constants.FONTSIZE.EM*0.5}]}>Last Sync Update:</Text>
                <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{
                String(lastSyncUpDate.getDate()).padStart(2, "0") + "/" + String(lastSyncUpDate.getMonth() + 1).padStart(2, "0") + "/" + lastSyncUpDate.getFullYear() + " " +
                String(lastSyncUpDate.getHours()).padStart(2, "0") + ":" + String(lastSyncUpDate.getMinutes()).padStart(2, "0") + ":" + String(lastSyncUpDate.getSeconds()).padStart(2, "0")
                }</Text>
            </CardContainer> 
        </View>
    );
}
export default PingDetails;

