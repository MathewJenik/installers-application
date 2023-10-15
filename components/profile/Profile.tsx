import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../loginModule/LoginModule";
import CardContainer from "../cardContainer/CardContainer";
import constants from "../../constants";

import EncryptedStorage from 'react-native-encrypted-storage';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Req, { AuthMethod } from "../../request/Request";
import styling from "../../styling";

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
    const [accountType, setAccountType] = useState("");

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

    /**
     * The useEffect used to fetch the user's details from the storage and 
     * set the state variables. It returns errors if there are any.
     */
    useEffect(() => {
      async function fetchData() {
        try {
          const userEmail = await EncryptedStorage.getItem('user_email');
          const userFullName = await EncryptedStorage.getItem('user_full_name');
          const userPhoneNumber = await EncryptedStorage.getItem('user_phone_number');
          
          setStoredEmail(userEmail);
          setStoredFullName(userFullName);
          setPhoneNumber(userPhoneNumber);
    
          // Call loginCheck after setting userEmail
          loginCheck(userEmail);
        } catch (error) {
          console.log(error);
        }
      }
    
      fetchData();
    }, []);

    /**
     * Function that checks the login type of the user.
     * That will returns the login type of the user in the 
     * banner.
     * @param userEmail 
     */
    async function loginCheck(userEmail) {
      console.log(userEmail);
      var results = await Req.loginTypeCheck(null, userEmail, false);
      if (results === AuthMethod.adhoc) {
        setAccountType("adhoc");
      } else if (results === AuthMethod.azure) {
       setAccountType("azure");
      }
    }
  
    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (
      <View>
        <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
          <ScrollView>

              <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto'}}>
                <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center'}}>
                    <CustomButton color={constants.HEX.NAVIGATIONCOLOUR} faIcon={faChevronLeft} onPress={async () => {
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
                <CardContainer title={'Profile Details'} colour='white' titleColour='white' >
                    <View style = {styles.container}>
                      <Text style = {[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Full Name</Text>
                      <View style = {styles.inputWrapper}>
                        <Text style = {[styling.Styles.Text_Size_1]}>{storedFullName || userFullName}</Text>
                      </View>
                    <Text style = {[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Email Address</Text>
                      <View style = {styles.inputWrapper}>
                        <Text style = {[styling.Styles.Text_Size_1]}>{storedEmail || userEmail}</Text>
                      </View>
                    <Text style = {[styling.Styles.Bold_Text, styling.Styles.Text_Size_2]}>Phone Number</Text>
                     <View style = {styles.inputWrapper}>
                      <Text style = {[styling.Styles.Text_Size_1]}>{phoneNumber || userPhoneNumber}</Text>
                      </View>
                    </View>
                </CardContainer>
                
                <CardContainer title={'Authentication Method'} colour="white" titleColour="white">
                  <View style={styles.bannerBorder}>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Icon name="exclamation-circle" size={20} style={{marginRight: 10, marginBottom: 45}}></Icon>
                      <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '90%'}}>
                        <Text style={[styling.Styles.Text_Size_2]}>This client account is using the {accountType} authentication method</Text>
                      </View>
                    </View>

                  </View>
                </CardContainer>
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
    marginBottom: constants.FONTSIZE.EM,
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