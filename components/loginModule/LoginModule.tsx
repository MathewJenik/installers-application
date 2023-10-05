import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

import Req, { AuthMethod } from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp, useCardAnimation} from '@react-navigation/stack';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';

export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  App: undefined;
  Profile: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

/**
 * Component for managing the login screen.
 *
 * @return {*} 
 */
function LoginModule(): any {

  // create the navigation variable that is used to navigate to different pages.
  const navigation = useNavigation<loginProp>();

  // email and password variables
  var email = "";
  var password = "";

  // used for if the email entered is valid, to show the required fields.
  var userChecked = false;

  return (
    <View style={styles.container}>
        {
          // Display Lymlive logo
        }
      <Image source={require('../../Images/Lymlive_Iris_login.png')} />
      <TextInput onChangeText={t => email = t} style={styles.textInput} placeholder='Email'></TextInput>
      {userChecked ?
      (
        <TextInput onChangeText={t => password = t} style={styles.textInput}  placeholder='Password' secureTextEntry={true}/>
      ) : null}
    
        {
          // Submit button
        }
      <CustomButton onPress={async () => {
        // Send data 
        let loginTypeCheckRes = await Req.loginTypeCheck(navigation, email, userChecked);
        let userCheckState = false;
        if (loginTypeCheckRes == AuthMethod.adhoc || loginTypeCheckRes == AuthMethod.azure) {
          userCheckState = true;
        }
        // set the user checked to true if the user exists.
        userChecked = userCheckState;
 
        // check if the user exists
        if (userChecked == true) {
          // complete the login request and get the resposne.
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