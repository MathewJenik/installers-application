import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

import Req from '../../request/Request';
import SearchField from './Search';
import Actions from './Actions';
import LoginModule, { RootStackParamList } from '../loginModule/LoginModule';
import Orientation from './Orientation';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { getStateFromPath, useNavigation } from '@react-navigation/native';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import Help from './Help';
import { width } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import PingDetails from './PingDetails';
import ClientPlayerDetails from './ClientPlayerDetails';
import { faUser} from '@fortawesome/free-solid-svg-icons'
import CustomAlert from '../customAlert/CustomAlert';
import Icon from 'react-native-vector-icons/FontAwesome';
import constants from '../../constants';
import Profile from '../profile/Profile';

type navProp = StackNavigationProp<RootStackParamList, "Admin">;

async function LogOut() {  
  // clear the storage of all user details
  try {   
    await EncryptedStorage.clear();
   
  } catch (error) {
    // There was an error on the native side
  }
}

declare global {
  var ping: string;
  var sync: string;
  var reboot: string;
  var mark: string;
  var rotate: string;
}


function AdminModule() {
  const [showingData, setShowingData] = useState(false);

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

  const [isModalVisible, setModalVisible] = useState(false);

  const [procDateSet, setProcDateSet] = useState(false);
  const [procDate, setProcDate] = useState("");
  const [MIHidden, setMIHidden] = useState(false);

  /**
   * Function to show the modal box.
   * 
   */
  const showAlert = () => {
    setModalVisible(true);
  };


  /**
   * Function to hide the modal box.
   *
   */
  const hideAlert = () => {
    setModalVisible(false);
  };

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

            if (response.error == true) {
              showAlert();
              setShowingData(false);
              
            } else {
              setCID(response.client.user_id);
              setLastSync(response.player.last_sync);
              setLastPingSuccess(response.player.last_success_ping);
              setLastPing(response.player.last_ping);
              setLastSyncUpdate(response.player.last_sync_update);
              setStartingOrientation(response.player.screen_orientation);
              //console.log("STARTING ORIENTATION: ", startingOrientation);
              
                            
              setClientName(response.client.user_business_name);
              setClientNumber(response.client.user_id);
              setMediaName(response.player.user_screens_name);
              setipAddress(response.player.ipAddr);
              setmpbid(response.player.id);
              
              setShowingData(true);

              // check if the procurement date has been set:
              setProcDate(response.player.procurement_date);
              if (procDate != "NULL" || Date.toString() != procDate) {
                setMIHidden(true);
              }

              // ping the media player
              var pingResult = await Req.pingMediaPlayer((Number)(search), response.client.user_id, session);

              setPingSuccessfull(pingResult.result);

              // currently the api does not mark the ping result as true if it is successfull, so for now only check if theres an error.
              if (pingResult.error == false) {
                setPingSuccessfull(true);
              }
              console.log("Starting Orientaiton:", response.player.starting_orientation);
              if (startingOrientation == "") {
                //searchMediaplay(value);
              }

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
                <CustomButton color={constants.HEX.NAVIGATIONCOLOUR} faIcon={faRightFromBracket} onPress={async () => {
                  LogOut();
                  navigation.navigate("Login");
                  setShowingData(false);
                }
                } title={null} flexRow={true} type={'small'}></CustomButton>
                <View style={{flex: 1}}></View>
                <Image style={{width: 80, height: 50, display: 'flex'}} source={require('../../Images/Iris_logo.png')} />
                <View style={{flex: 1}}></View>
                <View style={{display: 'flex'}}>
                  <CustomButton color={constants.HEX.NAVIGATIONCOLOUR} type={'small'} faIcon={faUser} onPress={async () => {
                      
                      navigation.navigate("Profile");
                      setShowingData(false);
                    }

                  } title={null} flexRow={true}></CustomButton>
                  <CustomAlert isVisible={isModalVisible} title="Wrong input" message={"The entered field must be a valid IP or MPID"} onClose={hideAlert}></CustomAlert>
                </View>
              </View>
            </View>
          <Help />

          <SearchField textChangeEvent={(t) => {setValue(t);}} onPress={() => {
            searchMediaplay(value);
          } } clearTextEvent={() => {setShowingData(false); setValue("")}} title={''} />


          {showingData ? (
              <>
                <ClientPlayerDetails procurement={procDate} clientName={clientName} clientNumber={clientNumber} mediaName={mediaName} ipAddres={ipAddres} mpbid={mpbid}></ClientPlayerDetails>
                <Actions hideMarkInstaller={MIHidden} devID={value} clientID={cID} interactionable={pingSuccessfull}></Actions>

                <Orientation devID={value} clientID={cID} startingOrientation={startingOrientation} onClick={() => {searchMediaplay(value);}}></Orientation>
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