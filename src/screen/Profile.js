import React, { useState} from "react";
import { ImageBackground, StyleSheet, Text, View , Image, TextInput, Button} from "react-native";
import { getItem, Keys} from '../libs/storage';
import {update} from '../libs/api';

export default function Profile(props) {
  const username = getItem(Keys.Username);
  const [profilePic, setProfilePic] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const id = getItem(Keys.userId)



  const onChangeName = (e) => {
      setName(e.nativeEvent.text);
  } 
  const onChangePassword = (e) => {
      setPassword(e.nativeEvent.text);
  }
  const onUpdate = async () => {
    console.log('update start')
    if (name.length >= 5 && password.length >= 5)
      {
          //Authenticate 
          const response = await update(name ,password, id)
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
      <Image source = {require("../picture/profile.png")} style={styles.image} ></Image>
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
    resizeMode: "contain",
    height: 200,
    width: 400
   }
  



});

