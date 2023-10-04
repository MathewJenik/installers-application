import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../loginModule/LoginModule";
import ViewContainer from "../viewContainer/ViewContainer";
import constants from "../../constants";
import { faChevronLeft, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface MonitoringInformationProps {
  userFullName : string;
  userEmailAddr: string;
}

const Profile = () => {
    const [userFullName, setUserFullName] = useState('');
    const [userEmailAddr, setUserEmailAddr] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState([true, true, true]);
  
    const toggleSecureEntry = (index: number) => {
      const updatedSecureEntry = [...isSecureEntry];
      updatedSecureEntry[index] = !updatedSecureEntry[index];
      setIsSecureEntry(updatedSecureEntry);
    };
    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (
      <View>
        <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
          <ScrollView>

              <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', margin: 'auto'}}>
                <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center'}}>
                    <CustomButton color={constants.NAVIGATIONCOLOUR} faIcon={faChevronLeft} onPress={async () => {
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
                        <Text></Text>
                      </View>
                    <Text style = {styles.labelName}>Email Address</Text>
                      <View style = {styles.inputWrapper}>
                        <Text></Text>
                      </View>
                    <Text style = {styles.labelName}>Phone Number</Text>
                     <View style = {styles.inputWrapper}>
                      <Text></Text>
                      </View>
                    </View>
                </ViewContainer>
                
                <ViewContainer title={'Authentication Method'} colour="white" titleColour="white">
                  <View style={styles.bannerBorder}>
                    <FontAwesomeIcon icon={faExclamationCircle} size={20} /> 
                    <Text style={styles.bannerLabel}> This client account is using the adhoc authentication method</Text>
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: constants.FONTSIZE.EM,
    paddingVertical: constants.FONTSIZE.EM/2,
  },
  container: {
    paddingHorizontal: constants.FONTSIZE.EM,
    paddingVertical: constants.FONTSIZE.EM/2,
  },
  labelName:{
    fontSize: 14,
    color: '#1f1f1f',
    paddingVertical: 10,
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
    padding: constants.FONTSIZE.EM,
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