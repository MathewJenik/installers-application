import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../loginModule/LoginModule";
import ViewContainer from "../viewContainer/ViewContainer";
import constants from "../../constants";
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Props for the MonitoringInformation component.
 * 
 * @interface MonitoringInformationProps
 * @property {string} userFullName - The full name of the user.
 * @property {string} userEmail - The email of the user.
 * @property {string} userPhoneNumber - The phone number of the user.
 */
interface MonitoringInformationProps {
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
}

/**
 * This function displays the profile details of the user.
 * 
 * @param {MonitoringInformationProps} props - The props of the component.
 * @param {string} props.userFullName - The full name of the user.
 * @param {string} props.userEmail - The email of the user.
 * @param {string} props.userPhoneNumber - The phone number of the user.
 */
const Profile: React.FunctionComponent<MonitoringInformationProps> = ({userFullName = '', userEmail = '', userPhoneNumber = ''}) => {
    // Define the state variables for the component and used to store the user's details.
    const [storedFullName, setStoredFullName] = useState('');
    const [storedEmail, setStoredEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState([true, true, true]);

    /**
     * Toggles the secure entry for the password fields.
     * 
     * @param {number} index - The index of the password field.
     */
    const toggleSecureEntry = (index: number) => {
      const updatedSecureEntry = [...isSecureEntry];
      updatedSecureEntry[index] = !updatedSecureEntry[index];
      setIsSecureEntry(updatedSecureEntry);
    };

    useEffect(() => {
      // Retrieve data from EncryptedStorage to show the user's details.
      EncryptedStorage.getItem('user_email')
        .then(userEmail => setStoredEmail(userEmail))
        .catch(error => console.log(error));
      EncryptedStorage.getItem('user_full_name')
        .then(userFullName => setStoredFullName(userFullName))
        .catch(error => console.log(error));
      EncryptedStorage.getItem('user_phone_number')
        .then(userPhoneNumber => setPhoneNumber(userPhoneNumber))
        .catch(error => console.log(error));
    }, []);
  
    
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

              <View style= {styles.boxSection}>
                <ViewContainer title={'Profile Details'} colour='white' titleColour='white' >
                    <View style = {styles.container}>
                      <Text style = {styles.labelName}>Full Name</Text>
                      <View style = {styles.inputWrapper}>
                        <Text style = {styles.profileText}>{storedFullName || userFullName}</Text>
                      </View>
                    <Text style = {styles.labelName}>Email Address</Text>
                      <View style = {styles.inputWrapper}>
                        <Text style = {styles.profileText}>{storedEmail || userEmail}</Text>
                      </View>
                    <Text style = {styles.labelName}>Phone Number</Text>
                     <View style = {styles.inputWrapper}>
                      <Text style = {styles.profileText}>{phoneNumber || userPhoneNumber}</Text>
                      </View>
                    </View>
                </ViewContainer>
                
                <ViewContainer title={'Authentication Method'} colour="white" titleColour="white">
                  <View style={styles.bannerBorder}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name="exclamation-circle" size={20} style={{marginRight: 10, marginBottom: 45}}></Icon>
                      <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '90%'}}>
                        <Text style={styles.bannerLabel}>This client account is using the Azure authentication method</Text>
                      </View>
                    </View>
                  </View>
                </ViewContainer>
                {/*
                  <ViewContainer title={'Password Reset'} colour='white' titleColour='white' >
                    <View style = {styles.container}>
                    <Text style = {styles.labelName}>Current Password</Text>
                    <View style = {styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={isSecureEntry[0]}
                      />
                      <TouchableOpacity onPress={() => toggleSecureEntry(0)} style={styles.icon}>
                        <Icon
                          name={isSecureEntry[0] ? 'eye-slash' : 'eye'}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.labelName}>New Password</Text>
                      <View style = {styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={isSecureEntry[1]}
                      />
                      <TouchableOpacity onPress={() => toggleSecureEntry(1)} style={styles.icon}>
                        <Icon
                          name={isSecureEntry[1]? 'eye-slash' : 'eye'}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style = {styles.labelName}>New Password Confirmation</Text>
                    <View style = {styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={isSecureEntry[2]}
                    />
                      <TouchableOpacity onPress={() => toggleSecureEntry(2)} style={styles.icon}>
                        <Icon
                          name={isSecureEntry[2]? 'eye-slash' : 'eye'}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    </View>
                    </View>
                    <View style={styles.savePasswordButton}>
                    <CustomButton onPress={() => Alert.alert('Password Changed!')} title="Password Change" color='#42b4ff' iconName='key' textPosition="center"></CustomButton>
                    </View>
                </ViewContainer>
                */}
              {/*
              <View style={styles.buttonBackground}>
                <CustomButton onPress={() => Alert.alert('Changes Saved')} title="Save Changes" color='#56c924' iconName='floppy-o' textPosition="center"></CustomButton>
                <CustomButton onPress={() => Alert.alert('Cancel')} title="Cancel" color='#ff5c33' iconName='times' textPosition="center"></CustomButton> 
              </View>
              */}
            </View>
          
          </ScrollView>
      
      </SafeAreaView>
      
  </View>
    );
}

const styles = StyleSheet.create({
  input: {
      flex: 1,
      padding: 10,
  },
  inputWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: constants.FONTSIZE.EM,
    paddingVertical: constants.FONTSIZE.EM/2,
  },
  container: {
    paddingHorizontal: constants.FONTSIZE.EM,
    paddingVertical: constants.FONTSIZE.EM/2,
  },
  labelName:{
    fontSize: 16,
    color: '#1f1f1f',
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  profileText:{
    fontSize: 14,
    color: '#484a48',
    fontWeight: 'bold',
  },
  bannerLabel:{
    fontSize: 20,
    color: '#102940',
    paddingVertical: constants.FONTSIZE.EM,
  },
  bannerBorder:{
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#102940',
    marginHorizontal: constants.FONTSIZE.EM,
    paddingVertical: constants.FONTSIZE.EM/2,
    paddingHorizontal: constants.FONTSIZE.EM,
    marginBottom: constants.FONTSIZE.EM*2,
    backgroundColor: '#acedfc',
  },
  boxSection:{
    paddingHorizontal: 20,
  },
  icon: {
    position: 'absolute', // Position the icon absolutely inside the input container
    right: 10, // Adjust the right position as needed
  },
  buttonBackground:{
    backgroundColor: 'white',
    marginBottom: constants.FONTSIZE.EM,
    marginTop: constants.FONTSIZE.EM*2,
    paddingHorizontal: constants.FONTSIZE.EM/2,
    paddingVertical: constants.FONTSIZE.EM*2,
    borderRadius: 4,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "grey",
  },
  savePasswordButton:{
    marginBottom: 20,
    paddingHorizontal: constants.FONTSIZE.EM/3,
  },
});
export default Profile;