import React, { useState} from "react";
import { ImageBackground, StyleSheet, Text, View , Image, TextInput, Button, ImagePickerIOS} from "react-native";
import { getItem, Keys, setItem} from '../libs/storage';
import {update, uploadProfile} from '../libs/api';
import {launchImageLibrary} from 'react-native-image-picker';

export default function Profile(props) {
  const username = getItem(Keys.Username);
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const id = getItem(Keys.userId)
  const profile = getItem(Keys.ProfilePic)

  



  const onChangeName = (e) => {
      setName(e.nativeEvent.text);
  } 
  const onChangePassword = (e) => {
      setPassword(e.nativeEvent.text);
  }
 

  const browsePhoto = () => {
    options = {
    }
    launchImageLibrary(options, async response => {
      if (response.uri) {
        console.log(response)
        setProfilePic(response.uri)
        const Response = await uploadProfile(id, profilePic)
        if(!response.error) {
          setItem(Keys.ProfilePic, Response.profile)
        }
        else
        console.log('there is an error')
      
      }
      else 
        console.log("no uri")

      
      
    })
  }
  const onUpdate = async () => {
    console.log('update start')
    if (name.length >= 5 && password.length >= 5)
      {
          //Authenticate 
          const response = await update(id, name ,password)
          if (!response.error) 
          {
            console.log(response)
            setItem(Keys.name, name)
            props.navigation.navigate('DashBoard')
          }
      }
  }

return (

  <View style={styles.container}>
    <Text>Edit</Text>
    
    <Image source = {require('../picture/profile.png')} style={styles.image} ></Image>
    {
      //!profile ? <Image source = {require('../picture/profile.png')} style={styles.image} ></Image> : <Image source = {require(profile)} style={styles.image}></Image>
    }
      <Button title ='choose photo' onPress={browsePhoto}></Button>
      <TextInput
            value={username}
            //disabled

        >  
        </TextInput>

        <TextInput 
            placeholder='input your new password'
            secureTextEntry={true}
            onSubmitEditing={onChangePassword}
        >
        </TextInput>
        <TextInput 
            placeholder='input your new name'
            onSubmitEditing={onChangeName}
        >
        </TextInput>

        <Button
        title='Update' 
        onPress={onUpdate}
        >
        </Button>
       
      


  </View>
) };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
    
   },
   image: {
    marginTop:'20px',
    marginBottom:'30px',
    resizeMode: "contain",
    height: 200,
    width: 400
   }
  



});

