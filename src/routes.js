const express = require('express');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

// exportar rotas desse arquivo, para que aplicação conheça-as
module.exports = routes;