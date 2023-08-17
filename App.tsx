/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
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

import Orientations from './components/orientation/orientation';
import Actions from './components/Actions/Actions';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LoginModule from './components/loginModule/LoginModule';
import {NavigationContainer} from '@react-navigation/native';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
        <ScrollView>
          <Actions></Actions>
          <Orientations></Orientations>
          <LoginModule />
        </ScrollView>
        
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

export default App;
