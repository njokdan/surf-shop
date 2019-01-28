const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middlewares/index');
const { 
    postIndex,
    postNew,
    postCreate,
    postShow,
    postEdit,
    postUpdate,
    postDestroy
} = require('../controllers/posts');

/* GET posts index - /posts */
router.get('/', asyncErrorHandler(postIndex));

/* GET new post - /posts/new */
router.get('/new', postNew);

/* POST create post - /posts */
router.post('/', asyncErrorHandler(postCreate));

/* GET show post - /posts/:id */
router.get('/:id', asyncErrorHandler(postShow));

/* GET edit post - /posts/:id/edit */
router.get('/:id/edit', asyncErrorHandler(postEdit));

/* PUT update post - /posts/:id */
router.put('/:id', asyncErrorHandler(postUpdate));

/* DELETE destroy post - /posts/:id */
router.delete('/:id', asyncErrorHandler(postDestroy));

module.exports = router;