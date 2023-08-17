/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react' ;
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Alert,
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Orientations from './components/orientation/orientation';
import Actions from './components/actions/Actions';
import SearchField from './components/search/Search';
import LoginModule from './components/loginModule/LoginModule';
import {NavigationContainer} from '@react-navigation/native';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
        <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView>
          <SearchField />
          <Actions></Actions>
          <Orientations></Orientations>
          <LoginModule />
        </ScrollView>
        
      </SafeAreaView>
    </NavigationContainer>
    
  );
}


export default App;
