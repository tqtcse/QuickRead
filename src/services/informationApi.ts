const userInformation = {
    name: 'Tran Quoc Toan',
    username: 'toan',
    email: 'john.doe@example.com',
    phone: '1234567890',
    address: '123 Main St, Anytown, USA',
    avatar: 'https://via.placeholder.com/150',
    category: ['romance', 'comics', 'inspiration2']
}

export const getInformation = async () => {

    const data = userInformation
    return data;
}

export const updateInformation = async (name: string, username: string, email: string, phone: string, address: string, avatar: string, category: string[]) => {
    const data = userInformation
    data.name = name;
    data.username = username;
    data.email = email;
    data.phone = phone;
    data.address = address;
    data.avatar = avatar;
    data.category = category;
    return data;
}

