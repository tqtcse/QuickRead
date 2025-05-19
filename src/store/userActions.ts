import { AppDispatch } from "./index";
import { setToken, removeToken, setBookMarked, setUserInformation } from "./userSlice";
import { login as loginApi } from "../services/authApi";
import { getBookByUserId } from "../services/bookApi";
import { toggleBookMarked as toggle } from "./userSlice";
import { getInformation } from "../services/informationApi";


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


export const toggleBookMarked = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const id2 = id
        // const response = await toggleBookMarkedApi(id);
        dispatch(toggle({ id: id2 }));
    } catch (error) {
        console.error('Error toggling book marked:', error);
        throw error;
    }
}

export const getUserInformation = () => async (dispatch: AppDispatch) => {
    try {
        const response = await getInformation();
        console.log('response:', response);
        dispatch(setUserInformation(response));
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
}
