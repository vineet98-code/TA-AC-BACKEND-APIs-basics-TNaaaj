var express = require('express');
var router = express.Router();

var Book = require('../models/Books');
var Comment = require('../models/Comments');
var User = require('../models/User');

router.get('/:comments/edit', function (req, res, next) {
  var commentId = req.params.commentId;

  Comment.findById(commentId, (err, editComment) => {
    if (err) return next(err);
    res.json({ editComment });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComments) => {
    if (err) return next(err);
    res.json( updatedComments.articleId);
  });
});

router.post('/:id/comment', (req, res, next) => {
    let bookId = req.params.id;
    let data = req.body;
    data.createdBy = req.user.id;
    Comment.create(data, (err, createdComment) => {
      if (err) return next(err);
      User.findByIdAndUpdate(
        req.user.id,
        {
          $push: { comments: createdComment.id },
        },
        (err, updatedUser) => {
          res.json({ createdComment, updatedUser });
        }
      );
    });
  });

router.get('/:id/delete', function (req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, (err, deletedComment) => {
    if (err) return next(err);
    Book.findByIdAndUpdate(comments.bookId, { $pull: { remark: comment.id }}, (err, event) => {
        if (err) return next(err);
        res.json({ deletedComment });
      });
  });
});

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, commentLike) => {
    if (err) return next(err);
    res.json( { commentLike });
  });
});

router.get('/:id/dislikes', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, commentLike) => {
    if (err) return next(err);
    res.json({ commentLike });
  });
});


module.exports = router;