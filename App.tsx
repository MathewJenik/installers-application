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
} from 'react-native';

import Actions from './components/actions/Actions';

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
      <SafeAreaView>
        <ScrollView>
          <Actions></Actions>
          <LoginModule />
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

export default App;
