import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringifyConfig } from "expo-router/build/fork/getPathFromState";



const initialState = {
    token: null,
    book: [] as { id: string, title: string, author: string, category: string, cover: string, description: string, rating: number, ratingAmount: number, reviewAmount: number }[],
    bookMarked: [] as { id: string, title: string, author: string }[],
    isBookMarkedLoaded: false,
    userInformation: {} as { name: string, username: string, email: string, phone: string, address: string, avatar: string },
    comment: [] as { avatar: string, book_id: string, user_name: string, text: string, date: string, like_count: number, rating: number }[],
    registerData: {
        fullname: '',
        username: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        address: '',
        avatar: '',
        gender: '',
        genres: [],
        password: '',
        confirmPassword: '',
        country: ''
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllBook: (state, action) => {
            state.book = action.payload;
        },
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
        setComment: (state, action) => {
            state.comment = action.payload;
        },
        setRegisterData: (state, action) => {
            state.registerData = { ...state.registerData, ...action.payload }
        }

    },
});

export const { setToken, removeToken, setBookMarked, toggleBookMarked, setUserInformation, setComment, setAllBook, setRegisterData } = userSlice.actions;
export default userSlice.reducer;

