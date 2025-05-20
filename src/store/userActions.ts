import { AppDispatch } from "./index";
import { setToken, removeToken, setBookMarked, setUserInformation, setComment, setAllBook, setRegisterData } from "./userSlice";
import { login as loginApi } from "../services/authApi";
import { getBookByUserId } from "../services/bookApi";
import { toggleBookMarked as toggle } from "./userSlice";
import { getInformation } from "../services/informationApi";
import { updateInformation as updateInformationApi } from "../services/informationApi";
import { getCommentById as getCommentByIdApi } from "../services/bookApi";
import { getAllBooks } from "../services/bookApi";


export const getAllBook = () => async (dispatch: AppDispatch) => {
    try {
        const response = await getAllBooks();
        dispatch(setAllBook(response));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}



export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginApi(email, password);
        if (response) {
            dispatch(setToken(response.token));
        }
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

export const updateInformation = (name: string, username: string, email: string, phone: string, address: string, avatar: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await updateInformationApi(name, username, email, phone, address, avatar, category);
        dispatch(setUserInformation(response));
    } catch (error) {
        console.error('Error updating user information:', error);
        throw error;
    }
}

export const getCommentById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getCommentByIdApi(id);
        dispatch(setComment(response));
        console.log('commmenrt:', response);
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
}
