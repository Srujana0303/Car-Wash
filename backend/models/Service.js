const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    place:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Place', 
        required: true
    }
});
  
module.exports = mongoose.model('Service', ServiceSchema);