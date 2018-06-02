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
        type: String,
        firstName: String,
        lastName: String,
        required: true
    },
    publishDate: publishDate || Date.now()
});

blogPostSchema.virtual('authorString').get(function () {
    return `${this.author.firstName} ${this.author.lastName}`
});


const BlogPost = mongoose.model('blog-post', blogPostSchema);

module.exports = {
    BlogPost
};