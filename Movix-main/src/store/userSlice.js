import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        ison: false,
        username: null,
        role: null,

    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.ison = action.payload.ison;
            state.username = action.payload.username; // Corrected to set 'ison' properly
            state.role = action.payload.role; // Corrected to set 'ison' properly


        },
        clearUser: (state) => {

            state.id = null;
            state.ison = false;
            state.username = null;
            state.role = null;
        },



    },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;