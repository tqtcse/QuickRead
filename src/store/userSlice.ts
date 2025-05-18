import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;

