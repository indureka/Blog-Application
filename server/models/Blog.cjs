const mongoose = require('mongoose');
const User = require('./User.cjs');
const BlogSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
    },
     category: {
        type: String,
        required: true,
     },
     author: {
        type: String,
        required: true,
     },
     content: {
        type: String,
        required: true,
     },
     image: {
        type: String,
     },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
     },
     createdAt: {
        type: Date,
        default: Date.now,
     },
     updatedAt: {
        type: Date,
        default: Date.now,
     }
})

module.exports = mongoose.model('Blog', BlogSchema);