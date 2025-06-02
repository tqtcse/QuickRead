import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

const initialState: AuthState = {
    token: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;

