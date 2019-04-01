const express = require('express');
const router = express.Router({mergeParams: true}); // Allow to get the url :placeholder from the route confg in app.js
const { asyncErrorHandler, isReviewAuthor } = require('../middlewares/index');
const {
    reviewCreate,
    reviewUpdate,
    reviewDestroy
} = require('../controllers/reviews');

/* POST reviews post - /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT update post - /posts/:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(reviewUpdate));

/* DELETE destroy post - /posts/:id/reviews/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(reviewDestroy));

module.exports = router;