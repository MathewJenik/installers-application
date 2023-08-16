import React from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import Req from '../../request/Request';

export default class LoginModule extends React.Component { 
  render() { 
    return (
      <View style={styles.container}>
        <Image source={require('../../Images/Lymlive_Iris_login.png')} />
        <TextInput style={styles.textInput} placeholder='Email'></TextInput>
        <Pressable style={styles.loginButton} onPress={Req.login}><Text style={styles.loginText}>Login</Text></Pressable>
      </View> 
    );
  }
}


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
    padding: 20,
    backgroundColor: 'white'
  },

  loginButton: {
    elevation: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,

    flex:1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 130,



  },

  loginText: {
    color: 'white',
    alignSelf: 'center',
    verticalAlign: 'auto',
    flex: 1,
    flexDirection: 'column',
    margin: 'auto',
    fontSize: 15


  }

});