const booksData = [
    {
        "id": "ROM001",
        "title": "Love in Paris",
        "author": "Sophie Lane",
        "category": "romance",
        "cover": "http://example.com/loveinparis.jpg",
        "description": "A heartwarming romance set in the city of love.",
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
        "category": "inspiration",
        "cover": "http://example.com/sunsetkisses.jpg",
        "description": "A summer romance that lingers long after the sun sets.",
        "rating": 4.5,
        "ratingAmount": 150,
        "reviewAmount": 60
    },
]

const booksOfUser = [
    {
        "id": "ROM001",
        "title": "Love in Paris",
        "author": "Sophie Lane",
    }
]

const booksOfUser2 = [
    {

    }
]

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