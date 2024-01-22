import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    documents: ''
}

export const documentSlice = createSlice({
    name:"document",
    initialState,
    reducers: {
        addDouments: (state, action) => {
            state.documents = action.payload
        },
    }
})

export const {addDouments} = documentSlice.actions
export default documentSlice.reducer