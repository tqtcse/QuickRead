const mongoose = require('mongoose');

const userLikeCommentsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books',
        required: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('UserLikeComments', userLikeCommentsSchema);
