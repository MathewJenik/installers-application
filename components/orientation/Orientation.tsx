import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons/faArrowRight'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown'
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
import CustomButton from '../customButton/CustomButton';


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
  const getAPI = () => {
    return fetch('https:api.lymlive.com.au/v2/auth/check.iris')
      .then(response => response)
      .then((response) => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

  let data = getAPI();
  console.log(data);
}

function displayAPI(){
  //Display payload
  fetch("https:api.lymlive.com.au/v2/installers/actions/screen__rotate.iris", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      player__id: 0,
      client__id: 0,
      orientation: 0,
      session_id: '',
    })
  })
  const getAPI = () => {
    return fetch('https:api.lymlive.com.au/v2/installers/actions/screen__rotate.iris')
      .then(response => response)
      .then((response) => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      });
  };

  let data = getAPI();
  console.log(data);
}


var normalPress = false;
var inversePress = false;
var leftPress = false;
var rightPress = false;

function pressNormal(): boolean {
  normalPress = true;
  handleAPI();
  console.log('normal')
  return normalPress;
}
function pressInverse(): boolean {
  inversePress = true;
  console.log('Inverse')
  return inversePress;
}
function pressLeft(): boolean {
  leftPress = true;
  console.log('Left')
  return leftPress;
}
function pressRight(): boolean {
  rightPress = true;
  console.log('Right')
  return rightPress;
}

export function Button(props: any){
  const { onPress, title = '',  icon, direction = '', iconName = ''} = props;
  return (
      <CustomButton color='#85c0f9' iconName={iconName} onPress={onPress} title={title}></CustomButton>
  );
}

export default class Orientation extends React.Component { 
    render() { 
      return (
        <View style={styles.viewStyle}>
          <View>
            <Button
              icon={faArrowUp}
              title="Normal"
              iconName='arrow-up'
              onPress={() => pressNormal()} />
          </View>
          
          <View style={{flexDirection:"row"}}>
              <Button
                icon={faArrowLeft}
                title="Left"
                iconName='arrow-left'
                onPress={() => pressLeft()} />
              <Button
                icon={faArrowRight}
                title="Right"
                iconName='arrow-right'
                onPress={() => pressRight()} />
            </View>
            
            <View>
              <Button
                icon={faArrowDown}
                title="Inverse"
                iconName='arrow-down'
                onPress={() => pressInverse()} />
            </View>

          </View>
      );
    }
  }

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    marginVertical: 14,
    borderWidth: 3,
    borderColor: '#85c0f9',
    marginHorizontal: 30,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#85c0f9',
    paddingLeft: 5,
    
  },
  viewStyle:{
    alignItems: 'center',
  }
})