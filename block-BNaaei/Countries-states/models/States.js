var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    population: { type: String, required: true },
    area: { type: String, required: true },
    neighbouring_states: { type: String, required: true },
});
