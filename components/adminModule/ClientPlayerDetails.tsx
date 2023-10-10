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
        <View style={styling.Styles.Card_Style as ViewStyle}>
            <CardContainer title={'Client and Player Details'} colour='white' titleColour='white' >
                {
                    // Displays all the text headers and to the right displays the
                }
                <Text style={styling.Styles.Bold_Text}>Client</Text>
                <Text style={styling.Styles.Text_Size_1}><Text style={styling.Styles.Bold_Text}>Name:</Text> {clientName}</Text>
                <Text style={styling.Styles.Text_Size_1}><Text style={styling.Styles.Bold_Text}>Client Number:</Text> {clientNumber}</Text>
                <Text style={styling.Styles.Bold_Text}>Media Player</Text>
                <Text style={styling.Styles.Text_Size_1}><Text style={styling.Styles.Bold_Text}>Name:</Text> {mediaName}</Text>
                <Text style={styling.Styles.Text_Size_1}><Text style={styling.Styles.Bold_Text}>IP Address:</Text> {ipAddres}</Text>
                <Text style={styling.Styles.Text_Size_1}><Text style={styling.Styles.Bold_Text}>MPBID:</Text> {mpbid}</Text>
            </CardContainer>

        </View>
    );
}
export default ClientPlayerDetails;

