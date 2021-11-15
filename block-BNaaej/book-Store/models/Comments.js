const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0},
  dislikes: { type: Number, default: 0},
  CreatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  
  bookId: { type: Schema.Types.ObjectId, ref: 'book', required: true },

}, { timestamps: true });

module.exports = mongoose.model('Comments', commentSchema);