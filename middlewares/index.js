const Review = require('../models/review');

module.exports = {
  // High-order function to handle errors from functions
  asyncErrorHandler: (fn) => {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
  },
  // Check the autorization of a review by checking the author
  isReviewAuthor: async (req, res, next) => {
    let review = await Review.findById(req.params.review_id);
    if (review.author.equals(req.user._id)) {
      return next();
    }
    req.session.error = 'Bye bye';
    res.redirect('/');
  }

}