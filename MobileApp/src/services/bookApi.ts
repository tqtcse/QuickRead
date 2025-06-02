
import axios from 'axios';
import type Book from '@/app/@type/Book';
import { API_URL } from '../config/env';

export const getAllBooks = async (token: string): Promise<Book[]> => {
    try {
        console.log(`${API_URL}/api/books`)
        const response = await axios.get(`${API_URL}/api/books`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response)
        if (response) {
            return response.data;
        }
        return []
    } catch (error) {
        console.error('Error fetching books:', error);
        return []
    }
}

export const updateBookMarked = async (id: string, status: string, token: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/userBookStatus`, {
            bookId: id,
            status: status
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
        return []
    } catch (error) {
        console.error('Error fetching books:', error);
        return []
    }
}

export const deleteBookMarked = async (id: string, token: string) => {
    try {
        const response = await axios.delete(`${API_URL}/api/userBookStatus`, {
            data: {
                bookId: id
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Error deleting book marked:', error);
        return [];
    }
};

export const getCommentById = async (id: string, token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/comments/book/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {
            const data = response.data;
            console.log('data:', data);
            return data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}
export const updateCategory = async (token: string, category: string[]) => {

    try {
        const response = await axios.put(`${API_URL}/api/user-categories`, { category_list: category }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {

            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Error updating category:', error);
        return [];
    }
}

export const getCategory = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/api/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}