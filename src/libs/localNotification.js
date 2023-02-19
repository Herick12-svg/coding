import PushNotification from "react-native-push-notification";

const CHANNEL_ID = 'myapps-local-push'
const CHANNEL_NAME = 'Task Channel'

const channelSetup = (channelId) => {
    console.log('channel id:', channelId, PushNotification.channelExists(channelId))
    if (!PushNotification.channelExists(channelId)) {
        PushNotification.deleteChannel(channelId)
    }
    PushNotification.createChannel(
        {
            channelId: channelId, // required
            channelName: CHANNEL_NAME, 
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
};

export { PushNotification }

export const sendLocalPushNotification = (notificationData, channelId=CHANNEL_ID) => {
    try {
        channelSetup(channelId);
        PushNotification.localNotification({
            channelId: channelId,
            autoCancel: true,
            bigText: notificationData.message,
            // subText: 'Local Notification',
            title: notificationData.title,
            data: notificationData.data,
            message: notificationData.message,
            vibrate: true,
            vibration: 300,
            playSound: true,
            soundName: 'default',
            // actions: '["Yes", "No"]'
        });
    } catch (error){
        console.log("push error", error)
    }
}