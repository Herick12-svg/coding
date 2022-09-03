import axios from 'axios'; //jembatan untuk connect sama backend/nodejs

export const URL = 'http://192.168.1.145:5000'

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
        // For files we use FormData
        const formData = new Formdata();
        formData.append('file' ,file)
        axios.post(`${URL}/user/${id}/project`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        }).then((res) => {
            resolve(res.data)
        }).catch((err) => reject(err))
    })
}
