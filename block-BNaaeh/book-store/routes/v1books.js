var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

// listing all articles
router.get('/', (req, res, next) => {
    Book.find({}, (err, books) => {
     if(err) return next(err)
      res.json({ books } )
    })
});

// Create Book 
router.post('/', (req, res, next) => {
  User.create(req.body, (err, createBook) => { // user.create going to invoked same hooks internally by mongo
    if (err) return next(err);
    res.json({ createBook });
  });
});

// Fetch Single article
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id).populate('authorId').exec((err, singleBook) => {
      res.json({ singleBook })
  });
});

// update a book
router.put('/:id', (req, res, next) => {
  let data = req.body;
  let boodId = req.params.id;

  Book.findByIdAndUpdate(bookId, data, (err, updatedBook) => {
    if (err) return next(err);
    res.json({ updatedBook });
  });
});

// Delete operation
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
      Author.findByIdAndUpdate(deletedBook.authorId, { $pull: { booksId: deletedBook._id }},
          (err, author) => {
              res.json({ deletedBook });
      });
  });
});

module.exports = router;
