import React from 'react'
import{View, StyleSheet, TextInput, Button, Text, ImagePropTypes, ImageBackground} from 'react-native'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screen/Profile'
import CameraScreen from '../screen/Camera'
import TaskList from '../screen/TaskList'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Task from '../screen/Task';


const Tab = createBottomTabNavigator();

const style = StyleSheet.create({
  text: {
    alignItems: 'center',
    justifyContent: 'center'
    
   }
   
  });


export default function DashBoard() {
  console.log('in to dashboard')

    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Camera') {
                    iconName = focused
                    ? 'camera'
                    : 'camera-outline';
                } 
                else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                }
                else if (route.name === 'TaskList') {
                  iconName = 'reader-outline';
                }
                

                return <Ionicons name={iconName} size={size} color={color}/>;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray'
            })}
        >
          <Tab.Screen 
              name="Profile" 
              component={ProfileScreen} 
              />
          <Tab.Screen 
              name="Camera" 
              component={CameraScreen} 
              options = {
                 { headerShown: false}
                }
              />
           <Tab.Screen 
              name="TaskList" 
              component={Task} 
              
              />
          </Tab.Navigator>
     
  
    );
   

    

  }
  
  