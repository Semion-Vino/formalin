const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: String,
    userId: String,
    description: String,
    fields: String,
    answers: Array,
});
module.exports = mongoose.model('Form', formSchema);

