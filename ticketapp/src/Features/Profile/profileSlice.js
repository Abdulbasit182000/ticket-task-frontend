import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {
        id: '',
        email: '',
        role: '',
        contact_number: '',
        username: ''
    }
}

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        newProfile:(state, action) => {
            state.profile.id = action.payload.id
            state.profile.email = action.payload.user.email
            state.profile.role = action.payload.role
            state.profile.contact_number = action.payload.contact_number
            state.profile.username = action.payload.user.username
        },
    }
})

export const {newProfile} = profileSlice.actions
export default profileSlice.reducer