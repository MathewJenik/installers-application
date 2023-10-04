import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, SafeAreaView, ScrollView, TextInput, View } from "react-native";
import CustomButton from "../customButton/CustomButton";
import { AuthMethod } from "../../request/Request";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../loginModule/LoginModule";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ProfileModule(): any {

    
    type navProp = StackNavigationProp<RootStackParamList, "Admin">;
    const navigation = useNavigation<navProp>();

    return (
        <View>
            <SafeAreaView style={{backgroundColor: '#e0e0e0'}}>
                <ScrollView>
                    <View style={{backgroundColor: "#cccccc", flexDirection: 'row', alignItems: 'center'}}>
                        <CustomButton faIcon={faArrowLeft} onPress={async () => {
                            navigation.navigate("Admin");
                        }
                        } title={'Back'} flexRow={true}></CustomButton>
                        <Image style={{width: 80, height: 50}} source={require('../../Images/Iris_logo.png')} />
                        
                    </View>
                
                </ScrollView>
            
            </SafeAreaView>
            
        </View>
    );

}
export default ProfileModule;
