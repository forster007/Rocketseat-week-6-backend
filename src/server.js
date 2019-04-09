const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const socket_io = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socket_io(server);

app.use(cors());

io.on('connection', socket => {
    console.log('ok');
    socket.on('connectRoom', box => {
        socket.join(box);
    });
});

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-fwnmc.mongodb.net/omnistack?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require('./routes'));

server.listen(3333);