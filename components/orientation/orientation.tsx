import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Alert,
    Button
} from 'react-native';



//Display orientation input
enum orientation {
	none = '',
	normal = 'normal',
	right = 'right',
	inverted = 'inverted',
	left = 'left'
}

//Display payload
let player_id: number = -1;
let client_id: number = -1;
let session_id: number = -1;

let API: [number, number, number]
API = [player_id, client_id, session_id]

var upPress = false;

function pressNormal(): boolean {
  upPress = true;
  Alert.alert("true");
  return upPress;
}
function pressInverse(): boolean {
  upPress = true;
  Alert.alert("true");
  return upPress;
}
function pressLeft(): boolean {
  upPress = true;
  Alert.alert("true");
  return upPress;
}
function pressRight(): boolean {
  upPress = true;
  Alert.alert("true");
  return upPress;
}

export default class Orientation extends React.Component { 
    render() { 
      return (
        <View style={styles.viewStyle}>
          <View>
            <Button
              title="Normal"
              onPress={() => console.log(pressNormal)} />
          </View>
          
          <View style={{ flexDirection:"row"}}>
              <Button
                title="Left"
                onPress={() => console.log(pressLeft)} />
              <Button
                title="Right"
                onPress={() => console.log(pressRight)} />
            </View>
            
            <View>
              <Button
                title="Inverse"
                onPress={() => console.log(pressInverse)} />
            </View>

          </View>
      );
    }
  }

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#31C283',
    justifyContent: 'center',
  },
  viewStyle:{
    alignItems: 'center',
    fontSize: 30,
    color: "green"
  }
})