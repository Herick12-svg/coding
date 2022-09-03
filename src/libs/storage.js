import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV({
    encryptionKey: 'c0d1ng2022$%',
    id: 'steamlab - apps'
})

export function setItem(key, value) {
    if (value) {
        storage.set(key, JSON.stringify(value))
    }
}

export function getItem(key) {
    const data = storage.getString(key);
    if (data)
        return JSON.parse(data)
    else
        return null;
}

export function getAllKeys() {
    return storage.getAllKeys()
}
export const Keys = {
    Username: 'username',
    userId: 'id',
    Name: 'name',
    Token: 'token',
    Role: 'role',
    ProfilePic: 'profilePic'
}
