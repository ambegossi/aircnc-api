const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app); //Pegando servidor http e extraindo ele de dentro do express
const io = socketio(server); //A partir disso, o server passa a também ouvir o protocolo websocket

const connectedUsers = {};

//socket representa a conexão com um novo usuário logado (web e mobile)
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    //relacionando o id de usuário com o id de conexão dele
    connectedUsers[user_id] = socket.id;
});

mongoose.connect('mongodb+srv://ambegossi:ambegossi@cluster0-pjivk.mongodb.net/aircncdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//use serve para adicionar uma funcionalidade em toda rota, independente se usa método get,pos...
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

// falando para o express utilizar formato json
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);