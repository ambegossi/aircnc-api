const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://ambegossi:ambegossi@cluster0-pjivk.mongodb.net/aircncdb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// falando para o express utilizar formato json
app.use(express.json());
app.use(routes);

app.listen(3333);