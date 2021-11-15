var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: { type: String, required: true },
    states: [{ type: Schema.Types.ObjectId, ref: 'State' }],
    continent: { type: String, required: true },
    population: { type: String, required: true },
    area: { type: String, required: true },
    ethnicity: { type: String, required: true },
    neighbouring_countries: { type: String, required: true },
});
