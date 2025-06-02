import axios from 'axios';
import { API_URL } from '../config/env';


export const logout = async () => {
    try {

        const data = { message: "đã đăng xuất" }
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const login = async (username: string, password: string) => {

    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });

        if (response.data.token) {
            return response.data.token;
        }
        return null;
    } catch (error) {

        console.error('Error fetching users:', error);
        return null;
    }
};

export const register = async (username: string, email: string, password: string, confirmPassword: string, country: string, date_of_birth: string, fullname: string, phone_number: string, avatar: string, gender: string, genres: string[]) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, { username, email, password, confirmPassword, country, date_of_birth, fullname, phone_number, avatar, gender, genres });

        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};