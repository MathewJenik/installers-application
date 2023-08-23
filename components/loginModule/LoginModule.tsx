import React, { useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';

import Req from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp, useCardAnimation} from '@react-navigation/stack';
import CustomButton from '../customButton/CustomButton';

export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

async function login(nav: any, userEmail: string) {
  
  var results = await Req.loginCheck(userEmail);

  if (results.error == true) {

    ToastAndroid.showWithGravity(results.errorMsg, ToastAndroid.LONG, ToastAndroid.CENTER);
  } else {

    
    if (results.valid == true) {

      nav.navigate('Admin');

    } else {

      

    }

  }
  

  console.log("TESTING : ", results);
  
}

/**
 *
 *
 * @return {*} 
 */
function LoginModule(): any {
  const navigation = useNavigation<loginProp>();
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../Images/Lymlive_Iris_login.png')} />
      <TextInput onChangeText={t => setEmail(t)} style={styles.textInput} placeholder='Email'></TextInput>
      {/*<Pressable style={styles.loginButton} onPress={() => navigation.navigate('Admin')}><Text style={styles.loginText}>Login</Text></Pressable>*/}
      <CustomButton onPress={() => {login(navigation, email)}} title={'Login'} />
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