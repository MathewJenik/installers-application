import { StyleSheet } from "react-native";
import constants from "../../constants";

export default StyleSheet.create({
    input: {
        flex: 1,
        padding: 10,
    },
    inputWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: constants.FONTSIZE.EM,
      paddingVertical: constants.FONTSIZE.EM/2,
    },
    container: {
      paddingHorizontal: constants.FONTSIZE.EM,
      paddingVertical: constants.FONTSIZE.EM/2,
    },
    labelName:{
      fontSize: 16,
      color: '#1f1f1f',
      paddingVertical: 10,
      fontWeight: 'bold',
    },
    profileText:{
      fontSize: 14,
      color: '#484a48',
      fontWeight: 'bold',
    },
    bannerLabel:{
      fontSize: 20,
      color: '#102940',
      paddingVertical: constants.FONTSIZE.EM,
    },
    bannerBorder:{
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#102940',
      marginHorizontal: constants.FONTSIZE.EM,
      paddingVertical: constants.FONTSIZE.EM/2,
      paddingHorizontal: constants.FONTSIZE.EM,
      marginBottom: constants.FONTSIZE.EM,
      backgroundColor: '#acedfc',
    },
    boxSection:{
      paddingHorizontal: 20,
    },
    icon: {
      position: 'absolute', // Position the icon absolutely inside the input container
      right: 10, // Adjust the right position as needed
    },
    buttonBackground:{
      backgroundColor: 'white',
      marginBottom: constants.FONTSIZE.EM,
      marginTop: constants.FONTSIZE.EM*2,
      paddingHorizontal: constants.FONTSIZE.EM/2,
      paddingVertical: constants.FONTSIZE.EM*2,
      borderRadius: 4,
      borderLeftWidth: 2,
      borderBottomWidth: 2,
      borderColor: "grey",
    },
    savePasswordButton:{
      marginBottom: 20,
      paddingHorizontal: constants.FONTSIZE.EM/3,
    },
});