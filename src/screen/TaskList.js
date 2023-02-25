import React, {useState, useRef, useEffect} from 'react';

import{View, StyleSheet, TextInput, Button, Text, ImagePropTypes, ImageBackground , TouchableOpacity} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { setItem, Keys} from '../libs/storage';
import {addTasked} from '../libs/api';
import { compareAsc, format, differenceInSeconds, formatDistanceStrict, parseISO } from 'date-fns'


const style = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
  
    },
     container2:{
        flex: 1,
        alignItems: 'center',
        flexDirection:'row'

    },
    textMargin: {
        marginBottom:10,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000000',
        textDecorationLine: 'underline',
      },
      Text: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#6495ED',
        paddingLeft: 5,
        marginLeft: 10
      },
      Text1: {
        fontSize: 25,
        fontStyle: 'italic',
        color: '#000000',
        paddingLeft: 5,
        marginLeft: 10,
        textDecorationLine: "underline"
      },
      fab: {
        flex:1,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        height:20,
        flexDirection:'row',
      },

     
   

       
  });

export  default function TaskList({name, list}) {


    return (
       <View style={style.container}>
           <Text style = {style.Text1}>{name}</Text>
            {
                
                list.map((item, index) => {
                    

                    if (item) {
                       
                        return(
                           
                            
                            <View key={index} style={style.container2}>
                                <TouchableOpacity  onPress={(e) => completeTask(index)}>
                                    <Ionicons name="ellipse-outline" />
                                </TouchableOpacity>
                                <Text style={style.Text} >{item.description}</Text>

                                   
                            </View>
                            
                        )
                    }
                    
                   

                   
                })

            }
             
         
       </View>
        
    )
}

