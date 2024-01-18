import projectReducer from '../Features/project/projectSlice'
import profileReducer from '../Features/Profile/profileSlice'
import userReducer from '../Features/user/userSlice'
import taskReducer from '../Features/tasks/taskSlice'
import commentReducer from '../Features/Comment/commentSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
    project: projectReducer,
    profile: profileReducer,
    user: userReducer,
    task: taskReducer,
    comment: commentReducer,
})
