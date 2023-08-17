import React from "react";
import { Text, TouchableOpacity, StyleSheet, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    color?: string;
    iconName?: string;
    iconColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({onPress, title, color ='#04abde', iconName, iconColor = 'white'}) => {
    const buttonStyles = {
        ...styles.button,
        backgroundColor: color,
      };
    
    return(
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
          <View style={styles.buttonContent}>
            {iconName && (<Icon name={iconName} size={20} color={iconColor} style={styles.icon}/>)}
            <Text style={styles.word}>{title}</Text>
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
    },
    buttonContent: {
      flexDirection: 'row', // Align icon and text horizontally
      alignItems: 'center', // Align icon and text vertically
  },
  })

  export default CustomButton;