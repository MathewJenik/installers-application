import { TextStyle, ViewStyle } from 'react-native';
import constants from "./constants";

export default {
Styles: {
    Bold_Text: {
      color: 'black' as TextStyle['color'],
      fontWeight: 'bold' as TextStyle['fontWeight'],
      fontSize: constants.FONTSIZE.EM,
    },

    Text_Size_1: {
      color: 'black' as TextStyle['color'],
      fontSize: constants.FONTSIZE.EM,
    },
    Text_Size_2: {
      color: 'black' as TextStyle['color'],
      fontSize: constants.FONTSIZE.EM * 1.2,
    },
    Text_Size_3: {
      color: 'black' as TextStyle['color'],
      fontSize: constants.FONTSIZE.EM * 1.4,
    },
    FlexContainerRow: {
      flexDirection: 'col' as TextStyle['flexDirection'],
    },

    Card_Style: {
      alignItems: 'center',
    },
    Default_Text: {
      color: "black" as TextStyle['color'],
      fontSize: constants.FONTSIZE.EM
    },
    Default_Text_Input: {
      color: 'black' as TextStyle['color'],
      borderColor: 'lightblue' as ViewStyle['borderColor'],
      borderStyle: 'solid' as ViewStyle['borderStyle'],
      borderRadius: 10,
      borderWidth: 2,
      width: 300,
      padding: 10,
      marginBottom: 10,
      marginTop: 20,

    },
    Default_Container: {
      flex: 1 as ViewStyle['flex'],
      justifyContent: "center" as ViewStyle['justifyContent'],
      alignItems: "center" as ViewStyle['alignItems'],
      paddingBottom: 80 as ViewStyle['paddingBottom'],
      height: '100%' as ViewStyle['height'],
      backgroundColor: 'white' as ViewStyle['backgroundColor']
    },
  },
}