import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    color?: string;
    iconName?: string;
    iconColor?: string;
    faIcon?: any;
    textPosition?: string;
    textColour?: string;
    enableBorder?: boolean;
    greyed?: boolean;
    greyedColour?: string;
    flexRow?: boolean;
    type?: string;
}

/**
 * 
 *
 * @param {*} {onPress, title, color ='#04abde', iconName, iconColor = 'white', faIcon}
 * @return {*} 
 */
const CustomButton: React.FC<CustomButtonProps> = ({onPress, title=null, color ='#04abde', iconName, iconColor = 'white', faIcon, textPosition = 'left', textColour='white', enableBorder=false, greyed=false, greyedColour="#91d9ff", flexRow=true, type="medium"}) => {
    const buttonStyles = {
      ...styles.button,
      backgroundColor: color,
      alignItems: textPosition
    };

    const greyButtonStyle = {
      ...styles.button,
      backgroundColor: greyedColour,
      alignItems: textPosition

    }

    const buttonStylesSmall = {
      ...buttonStyles,
      paddingHorizontal: 15,
    };

    const buttonStylesMedium = {
      ...buttonStyles,
      paddingHorizontal: 30,
    };

    const buttonStylesLarge = {
      ...buttonStyles,
      paddingHorizontal: 45,
    };

    const bordered = {
      borderColor: textColour,
      borderWidth: 1
    };
    
    const btnContentCol = {
      ...styles.buttonContent,
      flexDirection: 'col', // Align icon and text horizontally
      alignItems: 'center', // Align icon and text vertically

    }

    return(
        <TouchableOpacity style={[greyed ? greyButtonStyle : (type=="small") ? buttonStylesSmall : (type=="medium") ? buttonStylesMedium : buttonStylesLarge, enableBorder ? bordered : null]} onPress={onPress} >
          <View style={[flexRow ? styles.buttonContent : btnContentCol]}>

            {iconName && (<Icon name={iconName} size={20} color={iconColor} style={styles.icon}/>)}
            {faIcon && (<FontAwesomeIcon size={20} icon={faIcon} style={styles.icon} color={iconColor}/>)}

            {(title != null) ? (<Text style={[styles.word, {color: textColour, marginLeft:10}]}>{title}</Text>) : (null)}
          </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 5,
      margin: 10,
    },
    word:{
      color: 'white',
      fontSize: 20,
    },
    icon:{
      marginRight: 0,
    },
    buttonContent: {
      flexDirection: 'row', // Align icon and text horizontally
      alignItems: 'center', // Align icon and text vertically
      
    },
  })

  export default CustomButton;