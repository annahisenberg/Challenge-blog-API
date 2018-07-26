const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const authorSchema = mongoose.Schema({
    firstName: 'string',
    lastName: 'string',
    username: {
        type: 'string',
        unique: true
    }
});

const commentSchema = mongoose.Schema({ content: 'string' });

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
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    comments: [commentSchema]
});

blogPostSchema.pre('find', function(next) {
    this.populate('author');
    next();
});

blogPostSchema.virtual('authorName').get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});


blogPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        author: this.authorName,
        content: this.content,
        title: this.title,
        comments: this.comments
    };
};

//BlogPost represents collection of data in DB
const Author = mongoose.model('Author', authorSchema);
const BlogPost = mongoose.model('blog-post', blogPostSchema);

module.exports = {
    BlogPost,
    Author
};