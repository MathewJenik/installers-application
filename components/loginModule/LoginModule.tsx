import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

import Req, { AuthMethod } from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp, useCardAnimation} from '@react-navigation/stack';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';
import AzureAuth from 'react-native-azure-auth';
import {APPID, DIRID, OBJID} from "@env"

export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  App: undefined;
  Profile: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

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


  // Azure login
  const CLIENT_ID = APPID;
  const TENTANT_ID = DIRID;

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
    <View style={styles.container}>
      


      
      <Image source={require('../../Images/Lymlive_Iris_login.png')} />
      <TextInput onChangeText={t => setEmail(t)} style={styles.textInput} placeholder='Email'></TextInput>
      {userChecked ?
      (
        <TextInput onChangeText={t => setPassword(t)} style={styles.textInput}  placeholder='Password' secureTextEntry={true}/>
      ) : null}
    
      <CustomButton onPress={async () => {
        //navigation.navigate('Admin');
        console.log(email);
        let loginTypeCheckRes = await Req.loginTypeCheck(navigation, email, userChecked);
        let userCheckState = false;
        if (loginTypeCheckRes == AuthMethod.adhoc || loginTypeCheckRes == AuthMethod.azure) {
          userCheckState = true;
        }

        if (loginTypeCheckRes == AuthMethod.azure) {
          azureLogin();

        }
        setUserChecked(userCheckState);

        if (userChecked == true) {
          var response = Req.loginAdhoc(email, password);

          // if login is completed navigate to the admin page
          if (await response == true) {
            navigation.navigate('Admin');

          } else {
            // if login failed, show toast message
            ToastAndroid.show('Incorrect Password or Email', ToastAndroid.SHORT);

          }
        }
        
        }} title={'Login'} />
    
        
    </View>
  );

}
export default LoginModule;


const styles = StyleSheet.create({
  textInput: {
    borderColor: 'lightblue',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    width: 300,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 150,
    backgroundColor: 'white'
  },

  loginButton: {
    elevation: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,

    flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingBottom: 0



  },

  loginText: {
    color: 'white',
    alignSelf: 'center',
    verticalAlign: 'auto',
    flex: 1,
    flexDirection: 'column',
    margin: 'auto',
    fontSize: 15,
    paddingHorizontal: 100,
    paddingTop: 20

  }

});