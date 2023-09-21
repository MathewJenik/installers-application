import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../loginModule/LoginModule";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomButton from "../customButton/CustomButton";
import { useNavigation } from "@react-navigation/native";
import ViewContainer from "../viewContainer/ViewContainer";
import constants from "../../constants";

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
                <Text style={styles.boldText}>Client</Text>     
                <Text style={styles.text}><Text style={styles.boldText}>Name:</Text> {clientName}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>Client Number:</Text> {clientNumber}</Text>  
                <Text style={styles.boldText}>Media Player</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>Name:</Text> {mediaName}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>IP Address:</Text> {ipAddres}</Text>  
                <Text style={styles.text}><Text style={styles.boldText}>MPBID:</Text> {mpbid}</Text>             
            </ViewContainer>
            
        </View>
    );
}
export default ClientPlayerDetails;

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
