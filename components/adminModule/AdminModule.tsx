import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import Req from '../../request/Request';
import SearchField from '../search/Search';
import Actions from '../actions/Actions';
import LoginModule from '../loginModule/LoginModule';
import Orientation from '../orientation/Orientation';

function AdminModule() {

    const [showingData, setShowingData] = useState(false);

    return (
      <View>
        
        <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
            <ScrollView>
            <SearchField onPress={function (): void {
                setShowingData(true);
            } } title={''} />

            {showingData ? (
                <><Actions></Actions><Orientation></Orientation></>

            ):(<View></View>)}
            
            </ScrollView>
        
        </SafeAreaView>
      </View> 
    );
}

export default AdminModule;

