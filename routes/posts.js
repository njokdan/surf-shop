const express = require('express');
const router = express.Router();
const { errorHandler } = require('../middlewares/index');
const { 
    getPosts,
    newPost,
    createPost,
    showPost,
    editPost
} = require('../controllers/posts');

/* GET posts index - /posts */
router.get('/', errorHandler(getPosts));

/* GET new post - /posts/new */
router.get('/new', errorHandler(newPost));

/* POST create post - /posts */
router.post('/', errorHandler(createPost));

/* GET show post - /posts/:id */
router.get('/:id', errorHandler(showPost));

/* GET edit post - /posts/:id/edit */
router.get('/:id/edit', errorHandler(editPost));

/* PUT update post - /posts/:id */
router.put('/:id', (req, res) => {
    res.send('UPDATE /posts/:id');
});

/* DELETE destroy post - /posts/:id */
router.delete('/:id', (req, res) => {
    res.send('DESTROY /posts/:id');
});

module.exports = router;