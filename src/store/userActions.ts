import { AppDispatch } from "./index";
import { setToken, removeToken } from "./userSlice";
import { login as loginApi } from "../services/authApi";


export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginApi(email, password);
        dispatch(setToken(response.token));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


