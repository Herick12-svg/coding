import axios from 'axios'; //jembatan untuk connect sama backend/nodejs
import { Keys, getItem, } from './storage';
import { storage } from 'firebase-admin';
export const URL = 'http://192.168.1.125:5000'
const Token = getItem(Keys.Token);
const userId = getItem(Keys.userId)



export function login(username, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/auth/login` , {
            username, password
        }).then((res) => {
            //we use res.data so we can directry get the data
            resolve(res.data)
        }).catch((err) => reject(err))
    })
}
export function update(id, name, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/user/edit` , {
            name, password, id
        }).then((res) => {
            resolve(res)
        }).catch((err) => reject(err))
    })
}

export function uploadProfile(id, file) {
    return new Promise((resolve, reject) => {
        // For files, we use FormData
        const formData = new FormData();
        console.log('uploading profile ........')
        formData.append('file', {
            name: file.fileName,
            type: file.type,
            uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri
        });
        formData.append('id', id);        

        // Usually: Default Content-Type: application/json
        axios.post(`${URL}/user/${id}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => reject(err))
    })
}
export function addTasked(description, dueDate, user) {
    return new Promise ((resolve, reject) => {
        axios.post(`${URL}/tasklist/add`, {
            headers:{
                'Authorization': `bearer ${Token}`
            },
            description, dueDate, user
        }).then((res) => {
            resolve(res)
            console.log(res)
        
        }).catch((err)=> reject(err))

    })
}
export function getTaskList() {
    return new Promise ((resolve, reject) => {
        axios.post(`${URL}/tasklist/${userId}/obtain`, {
            headers:{
                'Authorization': `bearer ${Token}`
            },
        }).then((res) => {
            resolve(res)
            console.log(res)
        
        }).catch((err)=> reject(err))

    })
}

export function setToken(token) {
    if (token && token.length > 0) {
        axios.defaults.headers.common['Authorization'] = `bearer ${token}`
        cookies.set(Config.storage.TOKEN_KEY, token)
    }
}

