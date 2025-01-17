import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FunctionComponent, ReactNode } from "react";
import { Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import constants from "../../constants";
import { width } from "@fortawesome/free-solid-svg-icons/faArrowUp";
 

interface CardContainerProps {
    title: string;
    colour?: string;
    titleColour?: string;
    titleBackground?: any;
    children: ReactNode;
}

const CardContainer: FunctionComponent<CardContainerProps> = ({title, colour ="white", titleColour='white', titleBackground=constants.HEX.CARDTITLEBACKGROUND, children}) => {
    return(
        <View style={[styles.container, {backgroundColor: colour}]}>
            {title && <Text style={[styles.title, {color: titleColour, backgroundColor: titleBackground}]}>{title}</Text>}
            {children}
        </View>
    );
};


const styles = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: 20,
      width: "auto",
      alignSelf: 'flex-start',
      textAlign: "center",
      paddingVertical: constants.FONTSIZE.EM/2,
      paddingHorizontal: constants.FONTSIZE.EM/2,
      transform: [{translateY: -constants.FONTSIZE.EM}, {translateX: constants.FONTSIZE.EM}]
    },
    container: {
        marginTop: constants.FONTSIZE.EM*3,
        paddingHorizontal: constants.FONTSIZE.EM/2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderColor: "grey",
        marginBottom: constants.FONTSIZE.EM,
        minWidth: 340,
        width: "95%",
        paddingBottom: constants.FONTSIZE.EM
    }
})

export default CardContainer;
