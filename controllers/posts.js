const Post = require('../models/post');

module.exports = {
    // Obtener Posts - posts/
    async getPosts(req, res, next) {
        let posts = await Post.find({});

        res.render('posts/index', { posts: posts });
    },

    // Nuevo Post - posts/new
    newPost(req, res, next) {
        res.render('posts/new');
    },

    // Crear Post - posts/
    async createPost(req, res, next) {
        let post = await Post.create(req.body);

        res.redirect(`/posts/${post._id}`);
    },

    // Mostrar Post - posts/:id
    async showPost(req, res, next) {
        let post = await Post.findById(req.params.id);

        res.render('posts/show', {post: post});
    },

    // Editar POst - posts/edit/:id
    async editPost(req, res, next) {
        let post = await Post.findById(req.params.id);

        res.render('posts/edit', {post: post});
    }
}