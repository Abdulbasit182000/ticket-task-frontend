import PrivateAxios from '../Private'

//create Comment

export const createComment = (data) => {
    return PrivateAxios.post('comments/', data)
}

//update Comment

export const updateComment = (id, data) => {
    return PrivateAxios.put(`comments/${id}/`,data)
}

//delete Comment
export const deleteComment = (id) => {
    return PrivateAxios.delete(`comments/${id}/`)
}