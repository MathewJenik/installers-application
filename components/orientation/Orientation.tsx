import React, {useState, useEffect} from 'react';
import { Animated, Easing, ToastAndroid } from "react-native";
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
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

async function pressNormal(devID: String, clientID: String): Promise<boolean> {
  normalPress = true;
  //playerID: Number, clientID: Number, orient: ScreenOrientation, sessionID: string
  let session = await EncryptedStorage.getItem("session_id");
  await request.displayCheckValid((Number)(devID), (Number)(clientID), ScreenOrientation.normal, (String)(session));
  return normalPress;
}
async function pressInverse(devID: String, clientID: String): Promise<boolean> {
  inversePress = true;
  let session = await EncryptedStorage.getItem("session_id");
  await request.displayCheckValid((Number)(devID), (Number)(clientID), ScreenOrientation.inverted, (String)(session));
  return inversePress;
}
async function pressLeft(devID: String, clientID: String): Promise<boolean> {
  leftPress = true;
  let session = await EncryptedStorage.getItem("session_id");
  await request.displayCheckValid((Number)(devID), (Number)(clientID), ScreenOrientation.left, (String)(session));
  return leftPress;
}
async function pressRight(devID: String, clientID: String): Promise<boolean> {
  rightPress = true;
  let session = await EncryptedStorage.getItem("session_id");
  await request.displayCheckValid((Number)(devID), (Number)(clientID), ScreenOrientation.right, (String)(session));
  return rightPress;
}

export function Button(props: any){
  const { onPress, title = '',  icon, direction = '', iconName = ''} = props;
  return (
    <CustomButton color='#85c0f9' iconName={iconName} onPress={onPress} title={title}></CustomButton>
  );
}

interface OrientationProps {
  devID: string;
  clientID: string;
  startingOrientation: string;
}

const Orientation: React.FunctionComponent<OrientationProps> = ({devID = "", clientID = "", startingOrientation="normal"}) => { 

  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const [upPressed, setUpPressed] = useState(false);
  const [downPressed, setDownPressed] = useState(false);

  const [orientationLoading, setOrientationLoading] = useState(false);


  // function to set the selected buttons.
  function onClickNormal() {
    setUpPressed(false);
    setDownPressed(true)
    setLeftPressed(true);
    setRightPressed(true)
  }
  function onClickInverted() {
    setUpPressed(true);
    setDownPressed(false)
    setLeftPressed(true);
    setRightPressed(true)
  }
  function onClickLeft() {
    setUpPressed(true);
    setDownPressed(true)
    setLeftPressed(false);
    setRightPressed(true)
  }
  function onClickRight() {
    setUpPressed(true);
    setDownPressed(true)
    setLeftPressed(true);
    setRightPressed(false)
  }


  // Used for onload selection of the current orientation.
  useEffect(() => {
    if (startingOrientation == "normal") {
      onClickNormal();
    } else if (startingOrientation == "right") {
      onClickRight();
    } else if (startingOrientation == "inverse") {
      onClickInverted();
    } else if (startingOrientation == "left") {
      onClickLeft();
    }

  });

  


  // Spinning animatiion:
  const spinValue = new Animated.Value(0);


    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    // setup the animation for the spinning loading bar.
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear, 
                useNativeDriver: true,  
            }
        )
    ).start();
  

  return (  
    <View style={styles.viewStyle}>
      <ViewContainer title={'Orientations'} colour='white' titleColour='white' >

      {orientationLoading ? (
        <View style={{minWidth: 320}}>
          <Animated.View style={{transform: [{rotateZ: spin}], width: constants.FONTSIZE.LOOPING_ANIMATION*2, marginLeft: 100, marginBottom: 70, marginTop: 50 }}>
          <FontAwesomeIcon  icon={faSpinner} size={constants.FONTSIZE.LOOPING_ANIMATION*2}/>
          </Animated.View>
        </View>
      ):(

        <>
        <View  style={styles.button}>
          <CustomButton onPress={async () => {
            setOrientationLoading(true);
            let res = await pressNormal(devID, clientID);
            if (res == true) {
              onClickNormal();
            }
            setOrientationLoading(false);
            }} title={'Normal'} iconName='arrow-up' greyed={upPressed}/>
        </View>
        
        <View style={{flexDirection:"row", marginHorizontal: constants.FONTSIZE.EM/2}}>
          <View style={{flex: 4}}>
            <CustomButton onPress={async () => {
              setOrientationLoading(true);
              let res = await pressLeft(devID, clientID);
              if (res == true) {
                onClickLeft();
              }
              setOrientationLoading(false);
            }} title={'Left '} iconName='arrow-left' greyed={leftPressed}/>
          </View>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <CustomButton onPress={async () => {
              setOrientationLoading(true);
              let res = await pressRight(devID, clientID);
              if (res == true) {
                onClickRight();
              }
              setOrientationLoading(false);
            }} title={'Right'} iconName='arrow-right' greyed={rightPressed}/>
          </View>
        </View>
          
        <View style={styles.button}>
          <CustomButton onPress={async () => {
            setOrientationLoading(true);
            let res = await pressInverse(devID, clientID);
            if (res == true) {
              onClickInverted();
            }
            setOrientationLoading(false);
            }} title={'Inverse'} iconName='arrow-down' greyed={downPressed}/>
        </View>
        </>
      )}

        


      </ViewContainer>
    </View>
    
  );

}
export default Orientation;

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
