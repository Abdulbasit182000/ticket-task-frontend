import PrivateAxios from '../Private'

//create Project

export const createComment = (data) => {
    return PrivateAxios.post('comments/', data)
}

//update Comment

export const updateComment = (id, data) => {
    return PrivateAxios.put(`comments/${id}/`,data)
}