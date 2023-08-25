import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

import Req from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp, useCardAnimation} from '@react-navigation/stack';
import CustomButton from '../customButton/CustomButton';
import EncryptedStorage from 'react-native-encrypted-storage';

export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
  App: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

enum AuthMethod {
  none = '',
  azure = 'azure',
  adhoc = 'iris'
}

const loginAdhoc = async (userEmail: string, userPasword: string) => {

  var results = await Req.loginAdhoc(userEmail, userPasword);

  console.log("EMAIL:", userEmail);

  console.log("Password:", userPasword);

  console.log("ADHOC RESTULTS: ", results);


  // if there isnt an error, store the required details
  if (results.error == false) {
    
    try {
      await EncryptedStorage.setItem(
        "session_id",
        results.session_id
      );
      await EncryptedStorage.setItem(
        "user_email",
        userEmail
      );
      await EncryptedStorage.setItem(
        "user_password",
        userPasword
      );

      // Congrats! You've just stored your first value!
      } catch (error) {
          // There was an error on the native side
      }

      return true;
    } else {
      return false;
    }

}

const loginCheck = async (nav: any, userEmail: string, showFields: boolean) => {
  
  var results = await Req.loginCheck(userEmail);
  
  
  console.log("EMAILCHECK:", userEmail);
  
  if (results.error == true) {

    ToastAndroid.showWithGravity(results.errorMsg, ToastAndroid.LONG, ToastAndroid.CENTER);

    return false;
  } else {

    
    if (results.valid == true) {

      // complete the adhoc login proccess
      if (results.next == AuthMethod.adhoc) {

        //loginAdhoc();
      } else if (results.next == AuthMethod.azure) {
        nav.navigate('Admin');
      }


      return true;
      // complete the microsoft SSO login process

      //nav.navigate('Admin');

    } else {

      return false;
    }


  }
  
  
}

/**
 * Component
 *
 * @return {*} 
 */
function LoginModule(): any {

  const navigation = useNavigation<loginProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [userChecked, setUserChecked] = useState(Boolean);

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
        console.log(email)
        setUserChecked((Boolean)(await loginCheck(navigation, email, userChecked)));
        if (userChecked == true) {
          var response = loginAdhoc(email, password);
          if (await response == true) {
            navigation.navigate('Admin');

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