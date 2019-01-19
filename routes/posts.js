const express = require('express');
const router = express.Router();

/* GET posts index - /posts */
router.get('/', (req, res) => {
    res.send('INDEX /posts');
});

/* GET new post - /posts/new */
router.get('/new', (req, res) => {
    res.send('NEW /posts/new');
});

/* POST create post - /posts */
router.post('/', (req, res) => {
    res.send('POST /posts');
});

/* GET show post - /posts/:id */
router.get('/:id', (req, res) => {
    res.send('SHOW /posts/:id');
});

/* GET edit post - /posts/:id/edit */
router.get('/:id/edit', (req, res) => {
    res.send('EDIT /posts/:id/edit');
});

/* PUT update post - /posts/:id */
router.put('/:id', (req, res) => {
    res.send('UPDATE /posts/:id');
});

/* DELETE destroy post - /posts/:id */
router.delete('/:id', (req, res) => {
    res.send('DESTROY /posts/:id');
});

module.exports = router;