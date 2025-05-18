import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    bookMarked: [] as { id: string, title: string, author: string }[],
    isBookMarkedLoaded: false,

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
        setBookMarked: (state, action) => {
            state.bookMarked = action.payload;
            state.isBookMarkedLoaded = true;
        },
    },
});

export const { setToken, removeToken, setBookMarked } = userSlice.actions;
export default userSlice.reducer;

