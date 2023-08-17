import React from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Req from '../../request/Request';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Admin: undefined;
};

type loginProp = StackNavigationProp<RootStackParamList, "Login">;

function LoginModule() {
  const navigation = useNavigation<loginProp>();

  return (
    <View style={styles.container}>
      <Image source={require('../../Images/Lymlive_Iris_login.png')} />
      <TextInput style={styles.textInput} placeholder='Email'></TextInput>
      <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Admin')}><Text style={styles.loginText}>Login</Text></Pressable>
    </View> 
  );

}

export default LoginModule;
/*
export default class LoginModule extends React.Component { 
  render() { 
    return (
      <View style={styles.container}>
        <Image source={require('../../Images/Lymlive_Iris_login.png')} />
        <TextInput style={styles.textInput} placeholder='Email'></TextInput>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Admin')}><Text style={styles.loginText}>Login</Text></Pressable>
      </View> 
    );
  }
}
*/

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