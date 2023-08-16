/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {

  return (
    <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
      <ScrollView>
        <Orientations></Orientations>
      </ScrollView>
      
    </SafeAreaView>
  );
}


export default App;
