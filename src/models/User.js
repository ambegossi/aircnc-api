const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
});

// Exportar o model
module.exports = mongoose.model('User', UserSchema);