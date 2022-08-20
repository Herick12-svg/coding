import axios from 'axios'; //jembatan untuk connect sama backend/nodejs

export const URL = 'http://192.168.1.145:5000'

export function login(username, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/auth/login` , {
            username, password
        }).then((res) => {
            resolve(res)
        }).catch((err) => reject(err))
    })
}
export function update(name, password, id) {
    return new Promise((resolve, reject) => {
        axios.post(`${URL}/user/edit` , {
            name, password, id
        }).then((res) => {
            resolve(res)
        }).catch((err) => reject(err))
    })
}
