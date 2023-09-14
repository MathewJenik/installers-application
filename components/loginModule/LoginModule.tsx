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
 * Component for managing the login screen
 *
 * @return {*} 
 */
function LoginModule(): any {

  const navigation = useNavigation<loginProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [userChecked, setUserChecked] = useState(false);

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