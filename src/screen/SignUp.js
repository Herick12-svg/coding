import React, {useState, useRef, useEffect} from 'react';

import{View, StyleSheet, TextInput, Button, Text, ImagePropTypes, ImageBackground} from 'react-native'
import { setItem, Keys, getItem} from '../libs/storage';
import {signup, uploadProfile} from '../libs/api';

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

export  default function SignUp(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const nameRef = useRef()
    const pwdRef = useRef()
    const userRef = useRef()
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
    const onChangeName = (e) => {
        setName(e.nativeEvent.text);
    }
    const onSignUp = async () => {
        if (username, password, name)
            signup(username, password, name)
        
      
    }


    return (
        
        <View style={style.container}>
            <Text style={style.Text}>Sign Up</Text>
            {/* {
                //if username not herick => <div>not herick</div> but if name is herick => <div>hi herick</div>
                username!='herick'?<div>not herick</div>:<div>hi herick</div>
            } */}
            <TextInput 
                style={style.input}
                placeholder='Input Name'
                placeholderTextColor="#000000"
                onSubmitEditing={onChangeName}
                ref = {nameRef}>
            </TextInput>

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
            title='SignUp' 
            onPress={onSignUp}>
            </Button>

            

        </View>
    )
}
