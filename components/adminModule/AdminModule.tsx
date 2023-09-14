import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity} from 'react-native';

import Req from '../../request/Request';
import SearchField from '../search/Search';
import Actions from '../actions/Actions';
import LoginModule, { RootStackParamList } from '../loginModule/LoginModule';
import Orientation from '../orientation/Orientation';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import Help from '../help/Help';
import { ToastAndroid } from 'react-native';
import { width } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import PingDetails from '../pingDetails/PingDetails';

import Icon from 'react-native-vector-icons/FontAwesome';

type navProp = StackNavigationProp<RootStackParamList, "Admin">;

async function LogOut() {  
  // clear the storage of all user details
  try {   
    await EncryptedStorage.clear();
   
  } catch (error) {
    // There was an error on the native side
  }
}


function AdminModule() {
  const [showingData, setShowingData] = useState(false);

  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigation = useNavigation<navProp>();

  const [value, setValue] = useState("");
  const [cID, setCID] = useState("");

  /**
   * Function that completes the check for the media player based off input
   *
   * @param {string} search
   */
  const searchMediaplay = async (search: string) => {
      let session = await EncryptedStorage.getItem("session_id");
      console.log("SEARCH VALUE IS: ", value);

      if (session !== undefined) {
          if (session != null) {

            var response = await Req.searchRequest(search, session);

            if (response.error==true) {
              ToastAndroid.show(response.errorMsg,ToastAndroid.LONG);
              setShowingData(false);
              
            } else {
              setCID(response.client.user_id);
              console.log("CLIENT ID IS:", response.client.user_id);
              setShowingData(true);
            }
          }
      }
      
  }

  return (
    <View style={{backgroundColor: '#e0e0e0', height:"100%"}}>
      <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
          <ScrollView>
          <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center'}}>
            <CustomButton iconName='arrow-left' onPress={async () => {
              LogOut();
              navigation.navigate("Login");
              setShowingData(false);
            }
            } title={'Log out'} flexRow={true}></CustomButton>
            <Image style={{width: 80, height: 50}} source={require('../../Images/Iris_logo.png')} />
            <View style={{marginLeft: 'auto'}}>
              <CustomButton type={'small'} iconName='user' onPress={async () => {
                  
                  navigation.navigate("Profile");
                  setShowingData(false);
                }

              } title={null} flexRow={true}></CustomButton>
            </View>
          </View>
          
          <Help />

          <SearchField textChangeEvent={(t) => {setValue(t);}} onPress={() => {
            searchMediaplay(value);
          } } clearTextEvent={() => {setShowingData(false);}} title={''} />


          {showingData ? (
              <><PingDetails></PingDetails><Actions devID={value} clientID={cID}></Actions><Orientation devID={value} clientID={cID}></Orientation></>

          ):(<View></View>)}
          
          </ScrollView>
        
      </SafeAreaView>
    </View> 
  );
}

const styles = StyleSheet.create({
  box:{
    borderWidth: 1, 
    borderRadius: 4,
  },
  input: {
      flex: 1,
      padding: 10,
  },
  container: {
    margin: 10,
  },
  labelName:{

  },
  label:{
    backgroundColor: 'lightblue',
    fontSize: 16,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 140,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 3,
  },
  icon: {
    position: 'absolute', // Position the icon absolutely inside the input container
    right: 10, // Adjust the right position as needed
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

export default AdminModule;

