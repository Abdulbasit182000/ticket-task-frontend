import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: ''
}

export const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers: {
        addTasks: (state, action) => {
            state.tasks = action.payload
        },
    }
})

export const {addTasks} = taskSlice.actions
export default taskSlice.reducer