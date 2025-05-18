export const logout = async () => {
    try {

        const data = { message: "đã đăng xuất" }
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        // const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        const response = { data: { token: '12345678901' } }
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};