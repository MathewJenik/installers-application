import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
  
    const toggleSecureEntry = () => {
      setIsSecureEntry(!isSecureEntry);
    };
    

    return (
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

            <View style = {styles.box}>
            <Text style = {styles.label}>Password Reset</Text>
                <View style = {styles.container}>
                <Text style = {styles.labelName}>Current Password</Text>
                <View style = {styles.inputContainer}>
                  <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry={isSecureEntry}
                    ></TextInput>
                    <Icon name={isSecureEntry ? 'eye-slash' : 'eye'}
                    size={20}
                    color="gray"
                    onPress={toggleSecureEntry}></Icon>
                </View>
                <Text>New Password</Text>
                <View style = {styles.inputContainer}>
                  <TextInput 
                    style={styles.input} 
                    value={newpassword} 
                    onChangeText={setNewPassword} 
                    secureTextEntry={isSecureEntry}
                    ></TextInput>
                    <Icon name={isSecureEntry ? 'eye-slash' : 'eye'}
                    size={20}
                    color="gray"
                    onPress={toggleSecureEntry}></Icon>
                </View>
                <Text>New Password Confirmation</Text>
                <View style = {styles.inputContainer}>
                  <TextInput 
                    style={styles.input} 
                    value={confirmpassword} 
                    onChangeText={setConfirmPassword} 
                    secureTextEntry={isSecureEntry}
                    ></TextInput>
                    <Icon name={isSecureEntry ? 'eye-slash' : 'eye'}
                    size={20}
                    color="gray"
                    onPress={toggleSecureEntry}></Icon>
                </View>
                <CustomButton onPress={() => Alert.alert('Password Updated')} title="Change Password" color="#5db3e8" iconName="key"></CustomButton>
                </View>
            </View>

            <CustomButton onPress={() => Alert.alert('Changes Saved')} title="Save Changes" color='#42e83c' iconName='floppy-o'></CustomButton>
            <CustomButton onPress={() => Alert.alert('Cancel')} title="Cancel" color='#d64f42' iconName='times'></CustomButton> 
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