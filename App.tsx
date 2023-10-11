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

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminModule from './components/adminModule/AdminModule';
import React, { createContext, useState } from 'react';
import Splash from './components/splash/Splash';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import LoginModule from './components/loginModule/LoginModule';
import Profile from './components/profile/Profile';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Admin" component={AdminModule} />
        <Stack.Screen name="Login" component={LoginModule} />
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;