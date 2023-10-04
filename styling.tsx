import { TextStyle } from 'react-native';
import constants from "./constants";

export default {
Styles: {
    Bold_Text: {
      fontWeight: 'bold' as TextStyle['fontWeight'],
      fontSize: constants.FONTSIZE.EM
    },

    Text_Size_1: {
        fontSize: constants.FONTSIZE.EM,
    },

    Card_Style: {
        alignItems: 'center',
    },
  },
}