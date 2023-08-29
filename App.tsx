/**
 * Lymlive Installers Mobile 
 *
 * @format
 */
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  Button
} from 'react-native';



import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Orientations from './components/orientation/Orientation';
import Actions from './components/actions/Actions';
import SearchField from './components/search/Search';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminModule from './components/adminModule/AdminModule';
import React, { createContext, useState } from 'react';
import Splash from './components/splash/Splash';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginModule from './components/loginModule/LoginModule';



const Stack = createNativeStackNavigator();

function App(): JSX.Element {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let session = null;
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/*<Stack.Screen name="Splash" component={Splash} />*/}
        {/*
        <Stack.Screen name="Login" >{(props) => <LoginModule password={password} email={email} {...props} />}</Stack.Screen>
        <Stack.Screen name="Admin" >{(props) => <AdminModule password={password} email={email} {...props} />}</Stack.Screen>
        */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Admin" component={AdminModule} />
        <Stack.Screen name="Login" component={LoginModule} />
        
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;