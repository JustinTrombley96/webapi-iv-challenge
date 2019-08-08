const express = require('express');
const server = express();

const postsRouter = require('./routes/postsRouter');

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
	res.send('<h1>Welcome to my deployed app!</h1>');
});
