import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert } from 'react-native';

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
    enabled?: boolean;
    rgbaColour?: string;
    
}

/**
 * A component that renders a custom button with an icon and text
 *
 * @param {*} {onPress, title, color ='#04abde', iconName, iconColor = 'white', faIcon}
 * @return {*} 
 */
const CustomButton: React.FC<CustomButtonProps> = ({onPress, title=null, color ='#04abde', iconName, iconColor = 'white', faIcon, textPosition = 'left', textColour='white', enableBorder=false, greyed=false, greyedColour="#91d9ff", flexRow=true, type="medium", enabled=true, rgbaColour}) => {
    const buttonStyles = {
      ...styles.button,
      backgroundColor: rgbaColour,
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
        <TouchableOpacity style={[greyed ? greyButtonStyle : (type=="small") ? buttonStylesSmall : (type=="medium") ? buttonStylesMedium : buttonStylesLarge, enableBorder ? bordered : null]} onPress={enabled? onPress : null} >
          <View style={[flexRow ? styles.buttonContent : btnContentCol]}>

            {(iconName != null) ? ( 
              (rgbaColour != undefined) ? (
              <Icon name={iconName} size={20} color={iconColor} style={styles.icon}/>):
              (<Icon name={iconName} size={20} color={iconColor} style={styles.icon}/> )
            ) : (
              (null)
            )}
            
            
            {(faIcon != null) ? ( 
              (rgbaColour != undefined) ? (
              <FontAwesomeIcon size={20} icon={faIcon} style={styles.icon} color={iconColor}/>):
              ( <FontAwesomeIcon size={20} icon={faIcon} style={styles.icon} color={iconColor}/>)
            ) : (
              (null)
            )}
            {(title != null) ? (<Text style={[styles.word, {color: textColour, marginLeft:0}]}>{title}</Text>) : (null)}
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
      marginRight: 10,
      color: 'white'
    },
    buttonContent: {
      flexDirection: 'row', // Align icon and text horizontally
      alignItems: 'center', // Align icon and text vertically
      
    },
  })

  export default CustomButton;