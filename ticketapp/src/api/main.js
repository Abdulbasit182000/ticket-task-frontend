import {listprojects, deleteProject, createProject, updateProject, getTaskByProject} from './project/projectAPI'
import { createTask, deleteTask, updateTask, getCommentByTask } from './Task/TaskAPI'
import { profile, allProfiles } from './accounts/accountAPI'
import { addProject } from '../Features/project/projectSlice'
import { newProfile } from '../Features/Profile/profileSlice'
import { addAllUsers } from '../Features/user/userSlice'
import { addTasks } from '../Features/tasks/taskSlice'
import { addComments } from '../Features/Comment/commentSlice'



//accounts
export const getprofile = () => async (dispatch) => {
    try {
        const response = await profile()
        dispatch(newProfile(response.data[0]))
    }
    catch(error) {
        console.log(error)
    }
}

export const getAllUsers = () => async (dispatch) => {
    try {
        const response = await allProfiles()
        dispatch(addAllUsers(response.data))
    }
    catch(error) {
        console.log(error)
    }
}

//projects
export const getprojects = () => async (dispatch) => {
    try {
    const response = await listprojects()
    dispatch(addProject(response.data))
    }
    catch(error) {
        console.log(error)
    }
}

export const deleteprojects = (id) => async (dispatch) => {
    try {
        const reponse = await deleteProject(id) 
    }
    catch (error) {
        console.log(error)
    }
}

export const createProjects = (data) => async (dispatch) => {
    try {
        const response = await createProject(data)
    }
    catch (error) {
        console.log(error)
    }
}

export const updateProjects = (id, data) => async (dispatch) => {
    try {
        const response = await updateProject(id,data)
    }
    catch(error) {
        console.log(error)
    }
}

export const getTasks = (id) => async (dispatch) => {
    try {
        const response = await getTaskByProject(id)
        dispatch(addTasks(response.data))
    }
    catch(error) {
        console.log(error)
    }
}

//tasks

export const createTasks = (data) => async (dispatch) => {
    try {
        const response = await createTask(data)
    }
    catch(error) {
        console.log(error)
    }
}

export const deleteTasks = (id) => async (dispatch) => {
    try {
        const response = await deleteTask(id)
    }
    catch(error) {
        console.log(error)
    }
}

export const updateTasks = (id,data) => async (dispatch) => {
    try {
        const response = await updateTask(id,data)
    }
    catch(error) {
        console.log(error)
    }
}

export const getcomments = (id) => async (dispatch) => {
    try {
        const response = await getCommentByTask(id)
        dispatch(addComments(response.data))
    }
    catch(error) {
        console.log(error)
    }
}