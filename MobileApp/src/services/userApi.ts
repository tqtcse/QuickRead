import { API_URL } from '../config/env';
import axios from 'axios';

export const getUser = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }

    } catch (error) {
        console.error('Error fetching user:', error);

    }
}


export const getUserCategory = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/user-categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user category:', error);
    }


}

export const getUserBookStatus = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/userBookStatus`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Error fetching user book status:', error);
    }
}

export const getCommentById = async (token: string, id: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/comments/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching comment by id:', error);
    }
}

export const createComment = async (token: string, bookId: string, rating: number, text: string) => {
    try {

        const response = await axios.post(`${API_URL}/api/comments`, {
            bookId: bookId,
            rating: rating,
            text: text,
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating comment:', error);
    }
}

export const getUserComment = async (bookId: string, token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/comments/userComment`, {
            params: {
                bookId: bookId
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching user comment:', error);
    }
}

export const getLikedComments = async (bookId: string, token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/userLikeComments/liked-comments/${bookId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data.likedComments;
        }
    } catch (error) {
        console.error('Error fetching liked comments:', error);
    }
}

export const likeComment = async (commentId: string, token: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/userLikeComments/like`, {
            commentId: commentId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
    } catch (error) {
        console.error('Error liking comment:', error);
    }
}

export const unlikeComment = async (commentId: string, token: string) => {
    try {

        const response = await axios.post(`${API_URL}/api/userLikeComments/unlike`, {
            commentId: commentId
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
    } catch (error) {
        console.error('Error unliking comment:', error);
    }
}

export const updateUser = async (token: string, user: any) => {

    try {
        const response = await axios.put(`${API_URL}/api/users`, user, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

export const uploadAvatar = async (token: string, formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/api/users/upload-avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                // Không cần set 'Content-Type' khi gửi FormData
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
    }
}
