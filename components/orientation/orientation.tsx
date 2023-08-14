import React, {useState, useEffect} from 'react';

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

type login = {
  error: boolean,
  errorMsg: string,
  valid: boolean,
  next: any,
  email: string
}

function handleAPI(){
  //Display payload
  fetch("https:api.lymlive.com.au/v2/auth/check.iris", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: '20674250@student.westernsydney.edu.au'
    })
})

    .then((response) => response.json())
    .then((responseData) => {
        console.log(
            "POST Response",
            "Response Body -> " + JSON.stringify(responseData)
        )
    })
}

var normalPress = false;
var inversePress = false;
var leftPress = false;
var rightPress = false;

function pressNormal(): boolean {
  normalPress = true;
  handleAPI();
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

export function Button(props: any){
  const { onPress, title = '' } = props;
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