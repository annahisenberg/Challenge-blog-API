'use strict';

const express = require('express');
const mongoose = require('mongoose');
const blogPostsRouter = require('./blogPostsRouter');
const app = express();

mongoose.Promise = global.Promise;


app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.use('/blog-posts', blogPostsRouter);
app.use(express.json());

//If client makes request to non-existent endpoint
app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});


let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err)
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {
    app,
    runServer,
    closeServer
};