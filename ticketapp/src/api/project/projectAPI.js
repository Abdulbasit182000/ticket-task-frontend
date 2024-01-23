import privateAxios from '../auth/Private'


// List all Projects
export const listprojects = () => {
    return privateAxios.get('projects/')
}

// create project
export const createProject = (data) => {
    return privateAxios.post('projects/',data)
}

//update project
export const updateProject = (id,data) => {
    return privateAxios.put(`projects/${id}/`,data)
}

//delete project
export const deleteProject = (id) => {
    return privateAxios.delete(`projects/${id}/`)
}

//get task by project
export const getTaskByProject = (id) => {
    return privateAxios.get(`projects/${id}/task/`)
}

export const getDocumentByProject = (id) => {
    return privateAxios.get(`projects/${id}/document/`)
}