import privateAxios from '../auth/Private'

//create Comment

export const createComment = (data) => {
    return privateAxios.post('comments/', data)
}

//update Comment

export const updateComment = (id, data) => {
    return privateAxios.put(`comments/${id}/`,data)
}

//delete Comment
export const deleteComment = (id) => {
    return privateAxios.delete(`comments/${id}/`)
}