const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {
    BlogPost
} = require('./models');

//get all blog posts
router.get('/posts', (req, res) => {
    BlogPost
        .find()
        .then(blogposts => {
            res.json(blogposts);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//find blog post by id
router.get('/posts/:id', (req, res) => {
    BlogPost
        .findById(req.params.id)
        .then(blogpost => res.json(blogpost))
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// make a blog post
router.post('/post', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    BlogPost
        .create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })
        .then(blogpost => res.status(201).json(blogpost))
        .catch(err => {
            console.error(err);
            res.status(400).json({
                message: 'Internal server error'
            });
        });
});

// Delete a blog post
router.delete('/posts/:id', (req, res) => {
    BlogPost
        .findByIdAndRemove(req.params.id)
        .then(blogpost => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Internal server error'
        }));
});


//Update a blog post
router.put('/posts/:id', jsonParser, (req, res) => {
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id ` +
            `(${req.body.id}) must match`);
        console.error(message);
        return res.status(400).json({
            message
        });
    }

    const toUpdate = {};
    const updateableFields = ['title', 'content', 'author'];

    updateableFields.forEach(field => {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    BlogPost
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        })
        .then(blogpost => res.status(204).end())
        .catch(err => res.status(500).json({
            message: 'Internal server error'
        }));
});

module.exports = router;