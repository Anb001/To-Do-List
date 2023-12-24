const mongoose = require('mongoose');

const mongodb = 'mongodb://127.0.0.1/my_database';

mongoose.connect(mongodb);

const listSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
});
const list = mongoose.model('list', listSchema);

module.exports = list;
