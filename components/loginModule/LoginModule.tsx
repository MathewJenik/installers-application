import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import Req, { AuthMethod } from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp, useCardAnimation} from '@react-navigation/stack';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import CustomAlert from '../customAlert/CustomAlert';
import styling from '../../styling';
import { ScreenContainerProps } from 'react-native-screens';
import AzureAuth from 'react-native-azure-auth';
import {APPID, DIRID, OBJID} from "@env"


export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  App: undefined;
  Profile: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

// Azure login
const CLIENT_ID = APPID;
const TENTANT_ID = DIRID;

/**
 * Component for managing the login screen
 *
 * @return {*} 
 */
function LoginModule(): any {

  const navigation = useNavigation<loginProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [userChecked, setUserChecked] = useState(false);
  
  const [isModalVisible, setModalVisible] = useState(false);

  const showAlert = () => {
    setModalVisible(true);
  };

  const hideAlert = () => {
    setModalVisible(false);
  };


  const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
    tenant: TENTANT_ID,
    //redirectUri: "installers-application://installers-application/android/callback",
    
  });

  var state = { accessToken: null, user: '' , mails: [], userId: ''};
  

  const azureLogin = async () => {
    try {
      let tokens = await azureAuth.webAuth.authorize({scope: 'openid profile User.Read' })
      console.log('CRED>>>', tokens)
      state.accessToken = tokens.accessToken;
      let info = await azureAuth.auth.msGraphRequest({token: tokens.accessToken, path: 'me'})
      console.log('info', info)
      state.user = info.displayName;
      state.userId = tokens.userId;
      console.log(azureAuth);

      // now navigate to the admin page upon success
      navigation.navigate('Admin');
    } catch (error) {
      console.log('Error during Azure operation', error)
    }
  };


  const _onLogout = () => {
    azureAuth.webAuth
      .clearSession()
      .then(success => {
        this.setState({ accessToken: null, user: null });
      })
      .catch(error => console.log(error));
  };

  return (
    <View style={styling.Styles.Default_Container}>
  
      <Image source={require('../../Images/Lymlive_Iris_login.png')} />
      <TextInput onChangeText={t => setEmail(t)} style={styling.Styles.Default_Text_Input} placeholder='Email'></TextInput>
      {userChecked ?
      (
        <TextInput onChangeText={t => setPassword(t)} style={styling.Styles.Default_Text_Input}  placeholder='Password' secureTextEntry={true}/>
      ) : null}
    
      <CustomButton onPress={async () => {
        //navigation.navigate('Admin');
        console.log(email);
        let loginTypeCheckRes = await Req.loginTypeCheck(navigation, email, userChecked);
        let userCheckState = false;
        if (loginTypeCheckRes == AuthMethod.adhoc || loginTypeCheckRes == AuthMethod.azure) {
          userCheckState = true;
        }
        setUserChecked(userCheckState);

        // Login Using Azure
        if (loginTypeCheckRes == AuthMethod.azure) {
          azureLogin();
        }


        if (userChecked == true) {
          var response = Req.loginAdhoc(email, password);

          // if login is completed navigate to the admin page
          if (await response == true) {
            navigation.navigate('Admin');

          } else {
            // if login failed, show alert message
            showAlert();
          }
        }
        
        }} title={'Login'} />

      <CustomAlert isVisible={isModalVisible} title="Failed Login" message={"Incorrect username or password please try again!"} onClose={hideAlert}></CustomAlert>
    </View>
  );

}
export default LoginModule;