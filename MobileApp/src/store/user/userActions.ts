import { AppDispatch } from "../index";
import {
    setToken, setBookMarked, setComment, setAllBook, setUserCategory, setCategory
    , setUserComment, setCommentByUser, setLikedComments, setUser, setHasFetchedUser, setHasFetched
} from "../user/userSlice";
import { login as loginApi } from "../../services/authApi";
import { toggleBookMarked as toggle } from "../user/userSlice";
import { getCommentById as getCommentByIdApi } from "../../services/bookApi";
import { getAllBooks } from "../../services/bookApi";
import { getUserBookStatus } from "@/src/services/userApi";
import { updateBookMarked } from "@/src/services/bookApi";
import { deleteBookMarked as deleteBookMarkedApi } from "@/src/services/bookApi";
import { createComment as createCommentApi } from "@/src/services/userApi";
import { getUserComment as getUserCommentApi } from "@/src/services/userApi";
import { getLikedComments as getLikedCommentsApi } from "@/src/services/userApi";
import { likeComment as likeCommentApi } from "@/src/services/userApi";
import { unlikeComment as unlikeCommentApi } from "@/src/services/userApi";
import { getUser as getUserApi } from "@/src/services/userApi";
import { updateUser as updateUserApi } from "@/src/services/userApi";
import { deleteBookMarked as deleteBookMarkedAction } from "../user/userSlice";
import { getUserCategory as getUserCategoryApi } from "@/src/services/userApi";
import { getCategory as getCategoryApi } from "@/src/services/bookApi";

export const getUser = (token: string) => async (dispatch: AppDispatch) => {
    try {

        const response = await getUserApi(token);
        dispatch(setUser(response));
        dispatch(setHasFetchedUser(true));
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

export const getAllBook = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getAllBooks(token);

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
            dispatch(setToken(response));
        }

    } catch (error) {

        console.error('Error fetching users:', error);

        throw error;
    }
};

export const getBookMarked = (token: string) => async (dispatch: AppDispatch) => {
    try {
        // const response = await getBookByUserId(token);
        const response = await getUserBookStatus(token);

        dispatch(setBookMarked(response));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};


export const toggleBookMarked = (id: string, status: string, token: string) => async (dispatch: AppDispatch) => {
    try {

        const response = await updateBookMarked(id, status, token);
        if (response) {
            dispatch(toggle({ id: id, status: status }));
        }
    } catch (error) {
        console.error('Error toggling book marked:', error);
        throw error;
    }
}

export const deleteBookMarked = (id: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await deleteBookMarkedApi(id, token);
        if (response) {
            dispatch(deleteBookMarkedAction({ id: id }));
        }
    } catch (error) {
        console.error('Error deleting book marked:', error);
        throw error;
    }
}


export const updateInformation = (token: string, name: string, username: string, email: string, phone: string, address: string, avatar: string, country: string, dateOfBirth: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await updateUserApi(token, { fullname: name, username, email, phone_number: phone, address, avatar_url: avatar, country, date_of_birth: dateOfBirth });
        dispatch(setUser(response));
    } catch (error) {
        console.error('Error updating user information:', error);
        throw error;
    }
}

export const getCommentById = (id: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getCommentByIdApi(id, token);
        dispatch(setComment(response));

    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
}

export const createComment = (bookId: string, rating: number, text: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await createCommentApi(token, bookId, rating, text);
        dispatch(setUserComment(response));
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
}

export const getUserComment = (bookId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getUserCommentApi(bookId, token);

        dispatch(setCommentByUser(response));
    } catch (error) {
        console.error('Error fetching user comment:', error);
        throw error;
    }
}

export const getLikedComments = (bookId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getLikedCommentsApi(bookId, token);
        dispatch(setLikedComments(response));
    } catch (error) {
        console.error('Error fetching liked comments:', error);
        throw error;
    }
}

export const likeComment = (commentId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await likeCommentApi(commentId, token);

        // dispatch(setLikedComments(response));
        // dispatch(setChangeLikeComment(response));
    } catch (error) {
        console.error('Error liking comment:', error);
        throw error;
    }
}

export const unlikeComment = (commentId: string, token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await unlikeCommentApi(commentId, token);

        // dispatch(setLikedComments(response));
        // dispatch(setChangeLikeComment(response));
    } catch (error) {
        console.error('Error unliking comment:', error);
        throw error;
    }
}

export const setHasFetchedAction = (hasFetched: boolean) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setHasFetched(hasFetched));
    } catch (error) {
        console.error('Error setting hasFetched:', error);
        throw error;
    }
}

export const getUserCategory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getUserCategoryApi(token);
        dispatch(setUserCategory(response));
    } catch (error) {
        console.error('Error fetching user category:', error);
        throw error;
    }
}

export const getCategory = (token: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await getCategoryApi(token);
        dispatch(setCategory(response));
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
}

// export const getUserProfile = (token: string) => async (dispatch: AppDispatch) => {
//     try {
//         const response = await getUserProfileApi(token);
//         dispatch(setUserProfile(response));
//         dis
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         throw error;
//     }
// }