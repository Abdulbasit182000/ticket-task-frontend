import privateAxios from '../Private'
import privateAxiosForm from '../FormData'

// create document

export const createDocument = (data) => {
    return privateAxiosForm.post('documents/', data)
}

//update document

export const updateDocument = (id,data) => {
    return privateAxiosForm.put(`documents/${id}/`, data)
}

//delete Document

export const deleteDocument = (id) => {
    return privateAxios.delete(`documents/${id}/`)
}