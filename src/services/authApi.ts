export const logout = async () => {
    try {

        const data = { message: "đã đăng xuất" }
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};