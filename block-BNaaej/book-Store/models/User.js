var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcrypt');


var userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, required: true },
    bookId: { type: mongoose.Types.ObjectId, ref: 'Book' },
    comments: { type: mongoose.Types.ObjectId, ref: 'Comment' },
    
  },{ timestamps: true }
);



module.exports = mongoose.model('User', userSchema);