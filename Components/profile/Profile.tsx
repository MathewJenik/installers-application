import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, ScrollView, Image } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../loginModule/LoginModule";
import { useNavigation } from "@react-navigation/native";
import constants from "../../constants";

const Profile = () => {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
  
    const toggleSecureEntry = () => {
      setIsSecureEntry(!isSecureEntry);
    };
    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (
        <View>
            <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
                <ScrollView>

                    <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto'}}>
                      <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center'}}>
                          <CustomButton color={'#ffe500'} iconName='chevron-left' onPress={async () => {
                              navigation.navigate("Admin");
                          }
                          } title={null} flexRow={true} type="small"></CustomButton>
                          <View style={{flex: 1.25}}></View>
                          <Image style={{width: 80, height: 50}} source={require('../../Images/Iris_logo.png')} />
                          <View style={{flex: 1}}></View>
                          <View style={{flex: 1}}></View>
                      </View>
                    </View>

                    <View>
                      <View style = {styles.box}>
                      <Text style = {styles.label}>Account Details</Text>
                          <View style = {styles.container}>
                          <Text style = {styles.labelName}>Full Name</Text>
                          <TextInput style={styles.input}></TextInput>
                          <Text>Email Address</Text>
                          <TextInput style={styles.input}></TextInput>
                          <Text>Phone Number</Text>
                          <TextInput style={styles.input} ></TextInput>
                          </View>
                      </View>

                      <CustomButton onPress={() => Alert.alert('Changes Saved')} title="Save Changes" color='#42e83c' iconName='floppy-o'></CustomButton>
                      <CustomButton onPress={() => Alert.alert('Cancel')} title="Cancel" color='#d64f42' iconName='times'></CustomButton> 
                  </View>
                
                </ScrollView>
            
            </SafeAreaView>
            
        </View>
    );

}

const styles = StyleSheet.create({
  box:{
    borderWidth: 1, 
    borderRadius: 4,
  },
  input: {
      flex: 1,
      padding: 10,
  },
  container: {
    margin: 10,
  },
  labelName:{

  },
  label:{
    backgroundColor: 'lightblue',
    fontSize: 16,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 140,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 3,
  },
  icon: {
    position: 'absolute', // Position the icon absolutely inside the input container
    right: 10, // Adjust the right position as needed
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});
export default Profile;