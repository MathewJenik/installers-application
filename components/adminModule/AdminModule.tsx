import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

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
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';


type navProp = StackNavigationProp<RootStackParamList, "Admin">;

async function LogOut() {
  console.log("LOGGIN OUT");
  
  
  //const nav = useNavigation<navProp>();
  
  try {   
    await EncryptedStorage.clear();
    //nav.navigate("Login");
  } catch (error) {
      // There was an error on the native side
  }
  
}

//

function AdminModule() {
  const [showingData, setShowingData] = useState(false);

  const navigation = useNavigation<navProp>();

  const [value, setValue]=useState('');
  const[id, setId]=useState('');

  const searchMediaplay = async ( searchV: string, sId: string) => {
      let session = await EncryptedStorage.getItem("session_id");
      console.log("SEARCH VALUE IS: ", value);

      if (session !== undefined) {
          if (session != null) {

            var response = await Req.searchRequest(searchV, session);

            if (response.error==true) {
              ToastAndroid.show(response.errorMsg,ToastAndroid.LONG);
              setShowingData(false);
              
            } else {
              setShowingData(true);
            }
          }
      }
      

  }

  return (
    <View>
      <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
          <ScrollView>
          <View style={{backgroundColor: "#cccccc"}}>
            <CustomButton iconName='arrow-left' onPress={async () => {
              LogOut();
              navigation.navigate("Login");
              setShowingData(false);
            }
            } title={'Log out'} ></CustomButton>
          </View>
          
          <Help />

          <SearchField textChangeEvent={(v) => {console.log("IN TEXT IS: ", v);setValue(v)}} onPress={() => {
            searchMediaplay(value, id);
            
          } } title={''} />

          

          {showingData ? (
              <><Actions></Actions><Orientation></Orientation></>

          ):(<View></View>)}
          
          </ScrollView>
      
      </SafeAreaView>
    </View> 
  );
}

export default AdminModule;

