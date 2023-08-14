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
    Pressable,
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

var normalPress = false;
var inversePress = false;
var leftPress = false;
var rightPress = false;

function pressNormal(): boolean {
  normalPress = true;
  Alert.alert("Normal");
  return normalPress;
}
function pressInverse(): boolean {
  inversePress = true;
  Alert.alert("Inverse");
  return inversePress;
}
function pressLeft(): boolean {
  leftPress = true;
  Alert.alert("Left");
  return leftPress;
}
function pressRight(): boolean {
  rightPress = true;
  Alert.alert("Right");
  return rightPress;
}

export function Button(props){
  const { onPress, title = 'click' } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default class Orientation extends React.Component { 
    render() { 
      return (
        <View style={styles.viewStyle}>
          <View>
            <Button
              title="Normal"
              onPress={() => pressNormal()} />
          </View>
          
          <View style={{ flexDirection:"row"}}>
              <Button
                title="Left"
                onPress={() => pressLeft()} />
              <Button
                title="Right"
                onPress={() => pressRight()} />
            </View>
            
            <View>
              <Button
                title="Inverse"
                onPress={() => pressInverse()} />
            </View>

          </View>
      );
    }
  }

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'brown',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  viewStyle:{
    alignItems: 'center',
  }
})