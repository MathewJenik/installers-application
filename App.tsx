import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import CustomButton from "./Components/CustomButton";

const App = () => {
  const handleButtonPress = () => {
    console.log('Button Pressed');
  }

  return(
    <View style={styles.container}>
      <View style={styles.box}>
        <CustomButton title="Mark player as installed" onPress={handleButtonPress} color="#36bf00" iconName="wrench"/>
        <CustomButton title="Re-sync" onPress={handleButtonPress} iconName="cloud-download" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#c8ccc9',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 30,
    margin: 15,
  },
})

export default App;