import React, { useEffect} from 'react';
import {View, Text, Button, StyleSheet} from "react-native";
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationController from './NotificationController.android';
const Pushnotification = () => {
    useEffect(() => {
        messaging().setBackgroundMessageHandler(async remoteMessage => {
        // console.log('Message handled in the background!", remoteMessage);
    }, []);
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    // Alert.alert(A new FCM message arrived!", JSON.stringify(remote Message));
    console.log(remoteMessage)
    });
    return unsubscribe;
    }, []);
    const checkToken = async () => {
    const femToken = await messaging().getToken();
    if (femToken) {
        console.log(femToken);
        Alert.alert(femToken);
    }
    }
    return (
        <View style={styles.Container}>
        <NotificationController />
        <Text style={styles.paragraph}> Push Notification With Firebasse Demo </Text>
        <Button title="Get FCM Token" onPress={() => checkToken()} />
        </View>
    )
}
const styles = StyleSheet.create({
Container: {
flex: 1,
justifyContent: "space-around",
},
paragraph:{
    textAlign: "center",
    fontSize:22,
    color:"black",
    fontWeight:'bold',
},
})
export default Pushnotification;