import React, { useEffect, useRef } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform

} from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
// import CameraRoll from '@react-native-community/cameraroll'
import {PermissionAndroid} from "react-native";

export default function CameraScreen(props)
{
    const devices = useCameraDevices('wide-angle-camera')
    const device = devices.back
    const cameraRef = useRef(null)
    
    useEffect(() => {
        const requestPermission = async () => {
            // async/await method
            // const newCameraPermission = await Camera.requestCameraPermission()
            // console.log({newCameraPermission})

            // Promise based method
            Camera.requestCameraPermission().then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))
        }
        requestPermission();

    }, [])

    const onPhotoPress = async () => {
        if (cameraRef.current)
            {
                const photo = await cameraRef.current.takePhoto()
                savePicture(`file://${photo.path}`)
            }
            
    }
    const hasAndroidPermission = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
      
        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
      }
      
    const savePicture = async (fileName) => {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
          return;
        }
      
        //CameraRoll.save(fileName)
      };
    if (device == null) return <View><Text>Loading ...</Text></View>
    console.log({device})
    return (
        <>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
                video={true}
                ref={cameraRef}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onPhotoPress}>
                <Text>Photo</Text>
            </TouchableOpacity>            
        </>

    )
      
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        color: 'white'
    }
})