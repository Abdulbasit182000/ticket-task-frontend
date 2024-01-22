import publicAxios from '../Public'
import privateAxios from '../Private'

// Register

export const register =  (data) => {
    return publicAxios.post('register/',data)
}

//login
export const login = (data) => {
    return publicAxios.post('token/',data)
}

//profile
export const profile = () => {
    return privateAxios.get('profiles/')
}

//all users
export const allProfiles = () => {
    return privateAxios.get('profiles/1/')
}