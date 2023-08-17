/**
 * Lymlive Installers Mobile 
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
        <ScrollView>
          <SearchField onPress={function (): void {
            throw new Error('Function not implemented.');
          } } title={''} />
          <Actions></Actions>
          <Orientations></Orientations>
          <LoginModule />
        </ScrollView>
        
      </SafeAreaView>
    </NavigationContainer>
    
  );
}

export default App;
