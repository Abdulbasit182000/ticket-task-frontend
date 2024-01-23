import { listprojects, deleteProject, createProject, updateProject, getTaskByProject, getDocumentByProject } from './project/projectAPI'
import { getAllTasks, createTask, deleteTask, updateTask, getCommentByTask, getspecificTask } from './Task/TaskAPI'
import { createComment, updateComment, deleteComment } from './comment/commentAPI'
import { createDocument, updateDocument, deleteDocument } from './document/documentAPI'
import { profile, allProfiles } from './accounts/accountAPI'
import { addProject } from '../Features/project/projectSlice'
import { newProfile } from '../Features/Profile/profileSlice'
import { addAllUsers } from '../Features/user/userSlice'
import { addTasks } from '../Features/tasks/taskSlice'
import { addComments } from '../Features/Comment/commentSlice'
import { addDouments } from '../Features/Document/documentSlice'



//accounts
export const getprofile = () => async (dispatch) => {
    try {
        const response = await profile()
        dispatch(newProfile(response.data[0]))
    }
    catch (error) {
        console.log(error)
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await allProfiles()
        dispatch(addAllUsers(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

//projects
export const getprojects = () => async (dispatch) => {
    try {
        const response = await listprojects()
        dispatch(addProject(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteprojects = (id) => async (dispatch) => {
    try {
        await deleteProject(id)
    }
    catch (error) {
        console.log(error)
    }
}

export const createProjects = (data) => async (dispatch) => {
    try {
        await createProject(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const updateProjects = (id, data) => async (dispatch) => {
    try {
        await updateProject(id, data)
    }
    catch (error) {
        console.log(error)
    }
}

export const getTasks = (id) => async (dispatch) => {
    try {
        const response = await getTaskByProject(id)
        dispatch(addTasks(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

export const getDocuments = (id) => async (dispatch) => {
    try {
        const response = await getDocumentByProject(id)
        dispatch(addDouments(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

//tasks

export const ListTasks = () => async (dispatch) => {
    try {
        const response = await getAllTasks()
        dispatch(addTasks(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

export const createTasks = (data) => async (dispatch) => {
    try {
        await createTask(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteTasks = (id) => async (dispatch) => {
    try {
        await deleteTask(id)
    }
    catch (error) {
        console.log(error)
    }
}

export const updateTasks = (id, data) => async (dispatch) => {
    try {
        await updateTask(id, data)
    }
    catch (error) {
        console.log(error)
    }
}

export const specificTask = (id) => async (dispatch) => {
    try {
        const response = await getspecificTask(id)
        dispatch(addTasks(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

export const getcomments = (id) => async (dispatch) => {
    try {
        const response = await getCommentByTask(id)
        dispatch(addComments(response.data))
    }
    catch (error) {
        console.log(error)
    }
}

//comments

export const createComments = (data) => async (dispatch) => {
    try {
        await createComment(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const updateComments = (id, data) => async (dispatch) => {
    try {
        await updateComment(id, data)
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteComments = (id) => async (dispatch) => {
    try {
        await deleteComment(id)
    }
    catch (error) {
        console.log(error)
    }
}

// Documents

export const createDocuments = (data) => async (dispatch) => {
    try {
        await createDocument(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const updateDocuments = (id, data) => async (dispatch) => {
    try {
        await updateDocument(id, data)
    }
    catch(error) {
        console.log(error)
    }
}

export const deleteDocuments = (id) => async (dispatch) => {
    try {
        await deleteDocument(id)
    }
    catch(error) {
        console.log(error)
    }
}
