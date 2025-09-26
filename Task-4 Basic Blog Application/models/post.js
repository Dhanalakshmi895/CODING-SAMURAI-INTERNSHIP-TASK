const mongoose = require('mongoose');
const Comment = require('./comment'); // Make sure to require the Comment model

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [Comment.schema] 
});

module.exports = mongoose.model('Post', postSchema);