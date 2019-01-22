const express = require('express');
const router = express.Router({mergeParams: true}); // Allow to get the url :placeholder from the route confg in app.js

/* GET posts index - /posts/:id/reviews */
router.get('/', (req, res) => {
    res.send('INDEX /reviews');
});

/* POST create post - /posts/:id/reviews */
router.post('/', (req, res) => {
    res.send('CREATE /posts/:id/reviews');
});

/* GET edit post - /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res) => {
    res.send('EDIT /posts/:id/reviews/:review_id/edit');
});

/* PUT update post - /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res) => {
    res.send('UPDATE /posts/:id/reviews/:review_id');
});

/* DELETE destroy post - /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res) => {
    res.send('DESTROY /posts/:id/reviews/:review_id');
});

module.exports = router;