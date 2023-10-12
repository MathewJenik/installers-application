import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CardContainer from "../cardContainer/CardContainer";
import constants from "../../constants";
import styling from "../../styling";

interface MonitoringInformationProps {
    clientName: string;
    clientNumber: string;

    mediaName: string;
    ipAddres: string;
    mpbid: string;
}

/**
 * Function that displays a view with the client and player details. 
 * @param {string} clientName Client Name
 * @param {string} clientNumber Client Number
 * @param {string} mediaName Media Name
 * @param {string} ipAddres Ip Address
 * @param {string} mpbid MPBID
 * @returns view with client and player details.
 */
const ClientPlayerDetails: React.FunctionComponent<MonitoringInformationProps> = ({ clientName = "", clientNumber = "", mediaName = "", ipAddres = "", mpbid = "" }) => {

    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (
        <View style={[styling.Styles.Card_Style as ViewStyle]}>
            <CardContainer title={'Client and Player Details'} colour='white' titleColour='white' >
                {
                    // Displays all the text headers and to the right displays the
                }
                
                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3]}>Client</Text>
                <View style={{paddingLeft: constants.FONTSIZE.EM}}>
                    <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Name:</Text> 
                    <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{clientName}</Text>

                    <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Client Number:</Text> 
                    <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{clientNumber}</Text>
                </View>

                <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_3, {paddingTop:constants.FONTSIZE.EM}]}>Media Player</Text>
                <View style={{paddingLeft: constants.FONTSIZE.EM}}>
                    
                    <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Name:</Text> 
                    <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{mediaName}</Text>
                    <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>IP Address:</Text>
                    <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}> {ipAddres}</Text>
                    <Text style={[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>MPID:</Text> 
                    <Text style={[styling.Styles.Text_Size_2, {paddingLeft: constants.FONTSIZE.EM}]}>{mpbid}</Text>
                </View>
            </CardContainer>

        </View>
    );
}
export default ClientPlayerDetails;

