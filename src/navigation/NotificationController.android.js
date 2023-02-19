import React, { useEffect } from 'react';
import { Alert } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'

PushNotification.createChannel({
    channelId: "channel-id", // (required)
    channelName: "My channel", //(required)

    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    playSound: false, // (optional) default: true

    soundName: "default", // (optional) See “soundName* parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance

    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

},(created) => console.log(`createChannel return '${created}'`)

);

const NotificationController = (props) => {
    useEffect(() =>{
        const unsubscribe = messaging().onMessage(async(remoteMessage) => {
            PushNotification.localNotification({
                message: remoteMessage.notification.body,
                title: remoteMessage.notification.title,
                bigPictureUrl: remoteMessage.notification.android.imageUrl,
                smalllcon: remoteMessage.notification.android.imageUrl,
                // channelld: remoteMessage notification android.channelld,
                channelld: true,
                
                vibrate: true,
                
        });
    }, []);
    return unsubscribe
},[]);
return null;
}
export default NotificationController