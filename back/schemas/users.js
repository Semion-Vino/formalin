const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const formSchema = new mongoose.Schema({
    fullName: String,
    userName: String,
    email: {
        type: String,
        index: true,
        unique: true, // Unique index. If you specify `unique: true`
        // specifying `index: true` is optional if you do `unique: true`
    },
    password: { type: String, select: false },

});
module.exports = mongoose.model('User', formSchema);

