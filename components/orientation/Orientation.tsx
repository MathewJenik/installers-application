import React, {useState, useEffect} from 'react';
import { ToastAndroid } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
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
import ViewContainer from '../viewContainer/ViewContainer';
import constants from '../../constants';
import request from '../../request/Request';

//MPID: 15250
// IP:  172.18.1.84

var normalPress = false;
var inversePress = false;
var leftPress = false;
var rightPress = false;

export enum ScreenOrientation {
	none = '',
	normal = 'normal',
	right = 'right',
	inverted = 'inverted',
	left = 'left'
}

function pressNormal(): boolean {
  normalPress = true;
  request.displayCheckValid(ScreenOrientation.normal);
  return normalPress;
}
function pressInverse(): boolean {
  inversePress = true;
  request.displayCheckValid(ScreenOrientation.inverted);
  return inversePress;
}
function pressLeft(): boolean {
  leftPress = true;
  request.displayCheckValid(ScreenOrientation.left);
  return leftPress;
}
function pressRight(): boolean {
  rightPress = true;
  request.displayCheckValid(ScreenOrientation.right);
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
        <ViewContainer title={'Orientations'} colour='white' titleColour='white' >
          <View  style={styles.button}>
            <CustomButton onPress={() => pressNormal()} title={'Normal'} iconName='arrow-up' />
          </View>
          
          <View style={{flexDirection:"row", marginHorizontal: constants.FONTSIZE.EM/2}}>
            <CustomButton onPress={() => pressLeft()} title={'Left '} iconName='arrow-left' />
            <CustomButton onPress={() => pressRight()} title={'Right'} iconName='arrow-right' />

          </View>
            
          <View style={styles.button}>
            <CustomButton onPress={() => pressInverse()} title={'Inverse'} iconName='arrow-down' />
          </View>



        </ViewContainer>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    marginVertical: constants.BUTTON.VERTICALPADDING,
    borderColor: '#85c0f9',
    marginHorizontal: 30,
    alignSelf: 'center'
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