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
  
  const [isModalVisible, setModalVisible] = useState(false);

  const showAlert = () => {
    setModalVisible(true);
  };

  const hideAlert = () => {
    setModalVisible(false);
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

      <CustomAlert isVisible={isModalVisible} title="Failed Login" message={"Either the password or the username was incorrect"} onClose={hideAlert}></CustomAlert>
    </View>
  );

}
export default LoginModule;