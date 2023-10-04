import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

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
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Help from '../help/Help';
import { ToastAndroid } from 'react-native';
import { width } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import PingDetails from '../pingDetails/PingDetails';
import ClientPlayerDetails from '../ClientPlayerDetails/ClientPlayerDetails';
import { Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import constants from '../../constants';

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

  const [lastSync, setLastSync] = useState("");
  const [lastPing, setLastPing] = useState("'");
  const [lastPingSuccess, setLastPingSuccess] = useState("");
  const [lastSyncUpdate, setLastSyncUpdate] = useState("");
  const [startingOrientation, setStartingOrientation] = useState("");
  
  const [pingSuccessfull, setPingSuccessfull] = useState(false);


  const [clientName, setClientName] = useState("");
  const [clientNumber, setClientNumber] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [ipAddres, setipAddress] = useState("");
  const [mpbid, setmpbid] = useState("");


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
              Alert.alert(response.errorMsg);
              setShowingData(false);
              
            } else {
              setCID(response.client.user_id);
              setLastSync(response.player.last_sync);
              setLastPingSuccess(response.player.last_success_ping);
              setLastPing(response.player.last_ping);
              setLastSyncUpdate(response.player.last_sync_update);
              setStartingOrientation(response.player.screen_orientation);
              
                            
              setClientName(response.client.user_business_name);
              setClientNumber(response.client.user_id);
              setMediaName(response.player.user_screens_name);
              setipAddress(response.player.ipAddr);
              setmpbid(response.player.id)
              
              setShowingData(true);

              // ping the media player
              var pingResult = await Req.pingMediaPlayer((Number)(search), response.client.user_id, session);

              console.log("PINGING PLAYER", pingResult);

              setPingSuccessfull(pingResult.result);
             
            }
          }
      }
      
  }

  return (
    <View style={{backgroundColor: '#e0e0e0', height:"100%"}}>
      <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
          <ScrollView>
            <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto'}}>
              <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <CustomButton color={constants.NAVIGATIONCOLOUR} faIcon={faRightFromBracket} onPress={async () => {
                  LogOut();
                  navigation.navigate("Login");
                  setShowingData(false);
                }
                } title={null} flexRow={true} type={'small'}></CustomButton>
                <View style={{flex: 1}}></View>
                <Image style={{width: 80, height: 50, display: 'flex'}} source={require('../../Images/Iris_logo.png')} />
                <View style={{flex: 1}}></View>
                <View style={{display: 'flex'}}>
                  <CustomButton color={constants.NAVIGATIONCOLOUR} type={'small'} iconName='user' onPress={async () => {
                      
                      navigation.navigate("Profile");
                      setShowingData(false);
                    }

                  } title={null} flexRow={true}></CustomButton>
                </View>
              </View>
            </View>
          <Help />

          <SearchField textChangeEvent={(t) => {setValue(t);}} onPress={() => {
            searchMediaplay(value);
          } } clearTextEvent={() => {setShowingData(false);}} title={''} />


          {showingData ? (
              <>
                <ClientPlayerDetails  clientName={clientName} clientNumber={clientNumber} mediaName={mediaName} ipAddres={ipAddres} mpbid={mpbid}></ClientPlayerDetails>
                <Actions devID={value} clientID={cID} interactionable={pingSuccessfull}></Actions>

                <Orientation devID={value} clientID={cID} startingOrientation={startingOrientation}></Orientation>
                <PingDetails lastPing={lastPing} lastPingS={lastPingSuccess} lastSync={lastSync} lastSyncUpdate={lastSyncUpdate}></PingDetails>
              </>

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

