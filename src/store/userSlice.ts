import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringifyConfig } from "expo-router/build/fork/getPathFromState";

interface BookMarked {
    id: string;
    title: string;
    author: string;
    isBookMarked: boolean;
}

const initialState = {
    token: null,
    bookMarked: [] as { id: string, title: string, author: string }[],
    isBookMarkedLoaded: false,
    userInformation: {} as { name: string, username: string, email: string, phone: string, address: string, avatar: string }
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
            console.log('setBookMarked:', state.bookMarked);
            state.isBookMarkedLoaded = true;
        },
        toggleBookMarked: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const index = state.bookMarked.findIndex((book) => book.id === id);
            if (index !== -1) {
                // Nếu đã có → xóa khỏi danh sách
                state.bookMarked.splice(index, 1);
            } else {
                // Nếu chưa có → thêm vào danh sách
                state.bookMarked.push({ id, title: '', author: '' });
            }
        },
        setUserInformation: (state, action) => {
            state.userInformation = action.payload;
        },
    },
});

export const { setToken, removeToken, setBookMarked, toggleBookMarked, setUserInformation } = userSlice.actions;
export default userSlice.reducer;

