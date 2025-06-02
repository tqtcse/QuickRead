import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StringifyConfig } from "expo-router/build/fork/getPathFromState";
import type Book from "@/app/@type/Book";

export interface LikedComment {
    _id: string;
    book_id: string;
    user_id: string;
    rating: number;
    text: string;
}

const initialState = {
    token: null,
    hasFetched: false,
    hasFetchedProfile: false,
    error: null,
    book: [] as Book[],
    bookMarked: [] as { _id: string, bookId: string, status: string, createdAt: string, updatedAt: string }[],
    isBookMarkedLoaded: false,
    userInformation: {} as { name: string, username: string, email: string, phone: string, address: string, avatar: string },
    comment: [] as {
        avatar_url: string;
        _id: string;
        like_counts: number;
        updatedAt: string;
        updated_at: string; avatar: string, book_id: string, user_name: string, text: string, date: string, like_count: number, rating: number;
        user_id: {
            username: string;
            avatar_url: string;
        }
    }[],
    userComment: [] as {
        _id: string;
        book_id: string;
        user_id: string;
        rating: number;
        text: string;
    }[],
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
    CommentByUser: [] as {
        _id: string;
        book_id: string;
        user_id: string;
        rating: number;
        text: string;
    }[],
    likedComments: [] as LikedComment[],
    user: {} as {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        phone_number: string;
        date_of_birth: string;
        address: string;
        avatar_url: string;
        rule: string;
        gender: string;
        country: string;
    },
    changeLikeComment: {} as {
        message: string;
    },
    hasFetchedUser: false,
    userCategory: [] as {
        _id: string;
        name: string;
        _v: number;
    }[],
    category: [] as {
        _id: string;
        name: string;
    }[],
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

            state.isBookMarkedLoaded = true;
        },
        toggleBookMarked: (state, action: PayloadAction<{ id: string, status: string }>) => {
            const { id } = action.payload;

            if (state.bookMarked.some((book) => book.bookId === id)) {
                state.bookMarked = state.bookMarked.filter((book) => book.bookId !== id);
            }
            state.bookMarked.push({ _id: id, bookId: id, status: action.payload.status, createdAt: '', updatedAt: '' });


        },
        deleteBookMarked: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            const index = state.bookMarked.findIndex((book) => book.bookId === id);
            if (index !== -1) {
                state.bookMarked.splice(index, 1);
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
        },
        setUserComment: (state, action) => {
            state.userComment = action.payload;
        },
        setCommentByUser: (state, action) => {
            state.CommentByUser = action.payload;
        },
        setLikedComments: (state, action) => {
            state.likedComments = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setChangeLikeComment: (state, action) => {
            state.likedComments = action.payload;
        },
        setHasFetchedUser: (state, action) => {
            state.hasFetchedUser = action.payload;
        },
        cleanUser: (state) => {
            state.token = null;
            state.book = [];
            state.bookMarked = [];
            state.isBookMarkedLoaded = false;
            state.userInformation = { name: '', username: '', email: '', phone: '', address: '', avatar: '' };
            state.comment = [];
            state.userComment = [];
            state.CommentByUser = [];
            state.likedComments = [];
            state.user = { _id: '', fullname: '', username: '', email: '', phone_number: '', date_of_birth: '', address: '', avatar_url: '', rule: '', gender: '', country: '' };
            state.hasFetchedUser = false;
            state.registerData = { fullname: '', username: '', email: '', phone_number: '', date_of_birth: '', address: '', avatar: '', gender: '', genres: [], password: '', confirmPassword: '', country: '' };
            state.hasFetched = false;

        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setHasFetched: (state, action) => {
            state.hasFetched = action.payload;
        },
        setUserCategory: (state, action) => {
            state.userCategory = action.payload;
        },
        setHasFetchedProfile: (state, action) => {
            state.hasFetchedProfile = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        }

    },
});

export const { setToken, removeToken, setBookMarked, toggleBookMarked, deleteBookMarked,
    setUserInformation, setComment, setAllBook, setRegisterData, setUserComment, setCommentByUser,
    setLikedComments, setUser, setChangeLikeComment, setHasFetchedUser, cleanUser, setError, setHasFetched, setUserCategory,
    setHasFetchedProfile, setCategory } = userSlice.actions;
export default userSlice.reducer;

