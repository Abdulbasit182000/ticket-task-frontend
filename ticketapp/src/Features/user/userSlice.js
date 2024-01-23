import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: []
}

export const userSlice = createSlice({
    name:"users",
    initialState,
    reducers: {
        addAllUsers: (state,action) => {
            state.users = []
            const users = action.payload
            users.forEach((user) => {
                const profile = {
                    "id": user.id,
                    "email": user.user.email
                }
                state.users.push(profile)
            })
        },
    },
})

export const {addAllUsers} = userSlice.actions
export default userSlice.reducer