import React, {useState, useRef, useEffect} from 'react';

import{View, StyleSheet, TextInput, Button, Text, ImagePropTypes, ImageBackground} from 'react-native'
import { setItem, Keys, getItem} from '../libs/storage';
import {login, uploadProfile} from '../libs/api';

const style = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: "#5C9377"
      
     },
     Text: {
         fontWeight: "bold",
         fontSize: 30,
         textDecorationLine: "underline",
         marginBottom:10

     },
     button: {
        marginTop: 50,
        color: "#000000"
     },
     input: {
        height:35,
        borderWidth:1,
        padding:4,
        marginTop: 10,
        marginBottom: 20,
        width:160,
        textAlign: "center",
        


        
    },

   

       
  });

export  default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userRef = useRef()
    const pwdRef = useRef()
    const pushToken = getItem(Keys.pushToken);
    
   
    useEffect(() => {
        if (userRef.current)
            userRef.current.focus()
    },[])

    const onChangeUsername = (e) => {
        setUsername(e.nativeEvent.text);
        if (pwdRef.current)
            userRef.current.focus()
    } 
    const onChangePassword = (e) => {
        setPassword(e.nativeEvent.text);
    }
    const onLogin = async () => {
    console.log(username)
      if (username.length >= 5 && password.length >= 5)
      {

          //Authenticate 

          const response = await login(username ,password, pushToken)
          const data = response.data
          const token = response.token
          if(!response.error) {
            console.log(data)
            console.log(Keys.Username, username);
            console.log(Keys.userId, data._id)
            console.log(Keys.Name, data.name)
            console.log(Keys.Token, token)
            console.log(Keys.Role, data.role)
            

            setItem(Keys.Username, username);
            setItem(Keys.userId, data._id)
            setItem(Keys.Name, data.name)
            setItem(Keys.Token, token)
            setItem(Keys.Role, data.role)
            setItem(Keys.ProfilePic, data.profile)
    
            
            props.navigation.navigate('DashBoard')
            console.log('in')
          }
          
        
      }
    }


    return (
        
        <View style={style.container}>
            <Text style={style.Text}>Login</Text>
            {/* {
                //if username not herick => <div>not herick</div> but if name is herick => <div>hi herick</div>
                username!='herick'?<div>not herick</div>:<div>hi herick</div>
            } */}
            
            <TextInput
                style={style.input}
                placeholder="Input Username"
                placeholderTextColor="#000000"
                onSubmitEditing={onChangeUsername}
                ref = {userRef}
            /> 
            
            <TextInput 
                style={style.input}
                placeholder='Input Password'
                placeholderTextColor="#000000"
                secureTextEntry={true}
                onSubmitEditing={onChangePassword}
                ref = {pwdRef}>
            </TextInput>

            <Button 
            color = "#40305D"
            style = {style.button}
            title='Login' 
            onPress={onLogin}>
            </Button>

            

        </View>
    )
}
