import { AppDispatch } from "./index";
import { setToken, removeToken, setBookMarked } from "./userSlice";
import { login as loginApi } from "../services/authApi";
import { getBookByUserId } from "../services/bookApi";


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginApi(email, password);
        dispatch(setToken(response.token));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const getBookMarked = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getBookByUserId(token);
        dispatch(setBookMarked(response));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};


