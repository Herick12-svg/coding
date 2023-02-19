import React, { useState, useEffect} from "react";
import { ImageBackground, StyleSheet, Text, View , Image, TextInput, Button, TouchableOpacity} from "react-native";
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

  useEffect(() => {
    console.log(id)
    console.log('profiel : '  +  profile)
    console.log('in porfile')
}, [])
 

  const browsePhoto = () => {
    
    const options = {
      mediaType: 'photo'
      
    }
    launchImageLibrary(options, async response => {
      console.log(response)
      console.log('response', response)
      if (response) {
        const file = response.assets[0]
        console.log(file)
        const Response = await uploadProfile(id, file)
        setProfilePic(Response.profile)
        console.log(profilePic)
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
    <Text style={styles.textMargin}>Edit</Text>
    <TouchableOpacity onPress={browsePhoto}>
      {/* <Image source={require('../picture/profile.png') } style={styles.image} onPress={browsePhoto}/> */}
      {!profilePic ? <Image source = {require('../picture/profile.png')} style={styles.image} onPress={browsePhoto} ></Image> : <Image source = {profilePic} style={styles.image} onPress={browsePhoto}></Image>}
    </TouchableOpacity>
  
      <View style={styles.container2}>
        <Text style={styles.text}>Username : </Text>
        <TextInput  value={username}/>
      </View>


      <View style={styles.container2}>
        <Text style={styles.text}>Password : </Text>
        <TextInput 
            placeholder='input your new password'
            secureTextEntry={true}
            onSubmitEditing={onChangePassword}
        />
      </View>
      
      <View style={styles.container2}>
        <Text style={styles.text}>Name : </Text>
        <TextInput 
            placeholder='input your new name'
            onSubmitEditing={onChangeName}
        />
      </View>

        <Button
        style={styles.Button}
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
   container2: {
     flex: 0,
     alignItems: 'center',
     flexDirection: 'row',

   },
   image: {
    resizeMode: "contain",
    height: 200,
    width: 400,
    marginBottom:20
   },
   text:{
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000000',
   },
   textMargin: {
     marginBottom:20,
     fontSize: 30,
     fontWeight: 'bold',
     fontStyle: 'italic',
     color: '#000000',
     textDecorationLine: 'underline',
   },
   Button: {
    backgroundColor: 'black',
   }


  



});