const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // giả sử bạn có collection users
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    image: [
        {
            type: String, // có thể là URL hoặc path ảnh
            required: false
        }
    ],
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // mỗi like là một userId
        }
    ],

    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category' // mỗi like là một userId
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
