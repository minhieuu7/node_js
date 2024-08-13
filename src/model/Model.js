const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    description: {type: String} 
})

const Model = mongoose.model('model', ModelSchema);

module.exports = Model;