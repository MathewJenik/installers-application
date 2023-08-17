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
import Orientations from './components/orientation/Orientation';
import Actions from './components/actions/Actions';
import SearchField from './components/search/Search';
import LoginModule from './components/loginModule/LoginModule';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminModule from './components/adminModule/AdminModule';

const Stack = createNativeStackNavigator();


function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginModule} />
        <Stack.Screen name="Admin" component={AdminModule} />
      </Stack.Navigator>

{/*

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
      

  */}
      
    </NavigationContainer>
    
  );
}

export default App;
