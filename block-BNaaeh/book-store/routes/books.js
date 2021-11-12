var express = require('express');
var router = express.Router();

// listing all articles
router.get('/', (req, res, next) => {
    Book.find({}, (err, books) => {
     if(err) return next(err)
      res.render('books', { books: books } )
    })
});

// create book
router.get('/new', (req, res, next) => {
  res.render('addBook');
});

// Sending data 
router.post('/', function (req, res, next) {
  Author.findOne({ author_email: req.body.author_email }, (err, author) => {
    if (err) return next(err);
    if (!author) {
      Author.create(req.body, (err, author) => {
        req.body.authorId = author._id;
        Book.create(req.body, (err, book) => {
          console.log(typeof book.id, typeof book._id);
          if (err) return next(err);
          Author.findByIdAndUpdate(
            author._id,
            { $push: { booksId: book.id } },
            { new: true },
            (err, updatedAuthor) => {
              console.log(updatedAuthor);
              if (err) return next(err);
              res.redirect('/books');
            }
          );
        });
      });
    } else {
      req.body.authorId = author._id;
      Book.create(req.body, (err, book) => {
          console.log(typeof book.id, typeof book._id);
          if (err) return next(err);
          Author.findByIdAndUpdate(
              author._id,
              { $push: { booksId: book.id } },
              { new: true },
              (err, updatedAuthor) => {
              console.log(updatedAuthor);
              if (err) return next(err);
              res.redirect('/books');
              }
          );
      });
     }
  });
});

// Fetch Single article
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id).populate('authorId').exec((err, book) => {
      console.log(book);
      res.render('singleBooks', { book: book })
  });
});

// Delete operation
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, books) => {
      console.log(books);
      Author.findByIdAndUpdate(books.authorId, { $pull: { booksId: books._id }},
          (err, author) => {
              res.redirect('/books/');
      });
  });
});

module.exports = router;
