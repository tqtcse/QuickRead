const booksData = [
    {
        "id": "ROM001",
        "title": "Love in Paris",
        "author": "Sophie Lane",
        "category": "romance",
        "cover": "http://example.com/loveinparis.jpg",
        "description": "A heartwarming romance set in the city of love.  This is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the book.",
        "rating": 4.2,
        "ratingAmount": 120,
        "reviewAmount": 45
    },
    {
        "id": "ROM002",
        "title": "Letters to Juliet",
        "author": "Emma Rose",
        "category": "romance",
        "cover": "http://example.com/letterstojuliet.jpg",
        "description": "An epistolary journey of love and longing.",
        "rating": 4.0,
        "ratingAmount": 85,
        "reviewAmount": 30
    },
    {
        "id": "ROM003",
        "title": "Seasons of Love",
        "author": "Clara Bennet",
        "category": "romance",
        "cover": "http://example.com/seasonsoflove.jpg",
        "description": "A tale of love through spring, summer, fall and winter.",
        "rating": 3.3,
        "ratingAmount": 95,
        "reviewAmount": 38
    },
    {
        "id": "ROM004",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "romance",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0012",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "comics",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0013",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "comics",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0014",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "comics",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 2.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0015",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "comics",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0016",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "inspiration",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
    {
        "id": "ROM0017",
        "title": "Sunset Kisses",
        "author": "Noah Walker",
        "category": "inspiration2",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
]

const category = ['romance', 'comics', 'inspiration2']

const booksOfUser = [
    {
        "id": "ROM001",
        "title": "Love in Paris",
        "author": "Sophie Lane",
    }
]

const bookById = [
    {
        id: "ROM001",
        title: "Love in Paris",
        author: "Sophie Lane",
        category: "romance",
        cover: "http://example.com/loveinparis.jpg",
        description: "A heartwarming romance set in the city of love.",
        rating: 4.2,
        ratingAmount: 120,
        reviewAmount: 45
    }
];

const comment = [
    {
        avatar: "https://via.placeholder.com/150",
        book_id: "ROM001",
        user_name: "John Doe",
        text: "This is a comment This is a test description for the bookThis is a test descrThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookiption for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the bookThis is a test description for the books",
        date: "2023-10-15T10:00:00.000+00:00",
        like_count: 10,
        rating: 5
    },
    {
        avatar: "https://via.placeholder.com/150",
        book_id: "ROM001",
        user_name: "John Doe",
        text: "This is a comment s",
        date: "2023-10-15T10:00:00.000+00:00",
        like_count: 10,
        rating: 1
    }
];

export const getAllBooks = async () => {
    try {
        // const response = await fetch('https://api.example.com/books');
        // const data = await response.json();
        return booksData;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const getBookByUserId = async (id: string) => {
    try {
        const id2 = id;
        // const response = await fetch(`https://api.example.com/books/${id}`);
        console.log('id2:', id2);
        const data = booksOfUser;
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const updateBookMarked = async (id: string) => {
    try {
        const id2 = id;
        const data = booksOfUser;
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const getBookById = async (id: string) => {
    try {
        const data = booksData.find(book => book.id === id);
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

export const getCommentById = async (id: string) => {
    const data = comment
    console.log('data:', data);
    return data;
}
