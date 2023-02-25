import React, { useState, useEffect} from "react";
import { View, Text, Button, Alert } from 'react-native';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging'
import Login from '../screen/Login'
import DashBoard from './DashBoard';
import { setItem, Keys} from "../libs/storage";
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {sendLocalPushNotification} from "../libs/localNotification"
import PushNotification from "react-native-push-notification";
import SignUp from "../screen/SignUp";




function HomeScreen(props) {


    const onLoginPress =  () => {
        props.navigation.navigate('Login')
    }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:"#5C9377"}}>
      <Text style={{fontSize : 20 ,fontWeight: "bold", marginBottom:10}}>Home Screen</Text>
      <Button color = "#40305D" title="go to login screen" onPress={onLoginPress}></Button>
    </View>
  );
}


const Stack = createNativeStackNavigator();

const checkToken = async () => {
  const femToken = await messaging().getToken();
  if (femToken)
  {
    console.log("femtoken = ",femToken);
    setItem(Keys.pushToken, femToken);
    Alert.alert(femToken)
  }
}

const createLocalNotificationListeners = async () => {
  try {

    PushNotification.configure({

      // this will listen to your local push notifications on clicked 
      onNotification: (notification) => {
        console.log('click local notifs:', notification)
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.popInitialNotification((notification) => {
      // this will listen to your local push notifications on opening app from background state
      console.log('wake up from background notif:', notification)
    });
  
    sendLocalPushNotification({
      message: 'test local notif message',
      title: 'Local notifications'
    })
  } catch (e) {
    alert(e)
  //   Toast.show(e)
  }
}	

const createNotificationListeners = async () => {

  await checkToken()
  console.log("inin create notification listerners")
  /*
   * CASE 1: Triggered for data only payload in foreground
   */
  messaging().onMessage(async remoteMessage => {
   /* Handle the incoming data on remoteMessage*/ 
    // Get the message body
    let message_body = remoteMessage.notification.body;
  
    // Get the message title
    let message_title = remoteMessage.notification.title;
  
    // Get message image
    let avatar = remoteMessage.notification.android.imageUrl;
  
    // Append the message to the current messages state
    console.log({message_title, message_body, avatar})

  });

  /*
  *  CASE 2: Register background handler, handled on background state
  */
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  /*
   * CASE 3: If your app is in background, you can listen for when a    notification is clicked / tapped / opened as follows:
   */
  messaging().onNotificationOpenedApp(remoteMessage => {
   console.loog('open up remote notif', remoteMessage)
  });


  /*
   * CASE 4: If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
   */
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
       console.log('initial remote notif', remoteMessage)
    });
}



function Main() {
  useEffect(() => {
    checkToken()
    inAppMessaging().setMessagesDisplaySuppressed(true);
    createNotificationListeners()
    createLocalNotificationListeners()
  
    
  
  
   


  

    const subscribe = messaging().onMessage(async remoteMessage => {

			// Get the message body
			let message_body = remoteMessage.notification.body;
		
			// Get the message title
			let message_title = remoteMessage.notification.title;
		
			// Get message image
			let avatar = remoteMessage.notification.android.imageUrl;
		
			// Append the message to the current messages state
      console.log({message_title, message_body, avatar})
      
    })
    console.log(subscribe)
    
    // messaging().setbackgroundMessageHandler(async remoteMessage => {
    //   console.log("Message handled in the background!", remoteMessage)
    // })
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage))
    //   console.log(remoteMessage)
    // });
    // return unsubscribe;
  }, []);

 
 



  const allowToReceiveMessage = (isAllowed) => {
    setCanReceiveMessage(isAllowed);
  };

  return (

    <NavigationContainer>
      <Stack.Navigator>   
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" 
                      component={Login} 
                      options = {{
                        headerTitle: 'login to System',
                        headerRight: () => {
                          <Button 
                            onPress={() => alert('this is a Button')}
                            tittle='info'
                            color='#fff'
                            >
                         </Button>
                        }

                      }}
                      />
                      <Stack.Screen
                        name='DashBoard'
                        component = {DashBoard}

                      >
                      
                        
          </Stack.Screen>
          <Stack.Screen
              name="SignUp"
              component={SignUp}>
          </Stack.Screen>

                      
                      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;