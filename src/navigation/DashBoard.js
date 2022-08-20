import React from 'react'
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screen/Profile'
import CameraScreen from '../screen/Camera'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createBottomTabNavigator();

export default function DashBoard() {

    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Camera') {
                    iconName = focused
                    ? 'camera'
                    : 'camera-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
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
          </Tab.Navigator>
     
  
    );

  }
  
  