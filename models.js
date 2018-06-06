const mongoose = require('mongoose');

// schema to represent blog post
const blogPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        required: true
    },
    publishDate: publishDate || Date.now()
});

blogPostSchema.virtual('authorName').get(function () {
    return `${this.author.firstName} ${this.author.lastName}`
});

//BlogPost represents collection of data in DB
const BlogPost = mongoose.model('blog-post', blogPostSchema);

module.exports = {
    BlogPost
};