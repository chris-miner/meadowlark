const { Schema, model } = require('mongoose');

// create a schema for movie objects
const schema = new Schema({
    first: String,
    last: String,
    email: String
});

// compile the schema into a model
module.exports.Customer = model('Customer', schema);