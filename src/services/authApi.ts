import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

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
    console.log(username, password);
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        console.log("response111", response.data);
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
        const response = await axios.post(`${API_URL}/register`, { username, email, password, confirmPassword, country, date_of_birth, fullname, phone_number, avatar, gender, genres });
        console.log("response222", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};