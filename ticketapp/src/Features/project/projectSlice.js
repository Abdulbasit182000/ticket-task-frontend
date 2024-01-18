import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: ''
}

export const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.projects = action.payload
        },
    }
})

export const { addProject } = projectSlice.actions
export default projectSlice.reducer