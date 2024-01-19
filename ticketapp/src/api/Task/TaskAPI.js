import privateAxios from '../Private'


export const getAllTasks = () => {
    return privateAxios.get('tasks/')
}

export const createTask = (data) => {
    return privateAxios.post('tasks/', data)
}

export const deleteTask = (id) => {
    return privateAxios.delete(`tasks/${id}/`)
}

export const updateTask = (id,data) => {
    return privateAxios.put(`tasks/${id}/`,data)
}

export const getCommentByTask = (id) => {
    return privateAxios.get(`tasks/${id}/comment/`)
}