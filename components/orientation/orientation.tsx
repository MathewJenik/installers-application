import React from 'react';
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


export default class Orientation extends React.Component { 
    render() { 
      return (
        <View> 
            <Button
                title="Press me"
                onPress={() => Alert.alert('Simple Button pressed')}
            />
        </View> 
      );
    }
  }