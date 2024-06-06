import AsyncStorage from "@react-native-async-storage/async-storage"

const save = async (key: string, value: string) => {
    await AsyncStorage.setItem('access-token', value)
}
const get = async (key: string) => {
    return await AsyncStorage.getItem('access-token')
}
const remove = async (key: string) => {
    await AsyncStorage.removeItem(key)
}
const clear = async () => {
    await AsyncStorage.clear()
}

export enum Keys {
    AUTH_TOKEN = "AUTH_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}

export const asyncStorage = {
    save,
    get,
    remove,
    clear
}
