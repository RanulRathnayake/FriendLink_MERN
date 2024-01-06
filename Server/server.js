const express = require('express');
const server = express();

const PORT = 5000;
require('./models/user');
require('./models/post');

server.use(express.json());
server.use(require('./routes/auth'));
server.use(require('./routes/post'));

//database connection
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});


/* const customMiddleware = (req, res, next) => {
    console.log('Middleware executed!');
    next();
}
server.use(customMiddleware); */


server.get('/', (req, res) => {
    res.send('Hello from Express');
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});