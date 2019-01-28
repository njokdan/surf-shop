const Post = require('../models/post');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dxvpgpgoq',
    api_key: '536837126332476',
    api_secret: process.env.CLOUDINARY_SECRET
})

module.exports = {
    // Obtener Posts - posts/
    async postIndex(req, res, next) {
        let posts = await Post.find({});

        res.render('posts/index', { posts: posts });
    },

    // Nuevo Post - posts/new
    postNew(req, res, next) {
        res.render('posts/new');
    },

    // Crear Post - posts/
    async postCreate(req, res, next) {
        // cloudinary upload
        req.body.post.images = [];
        for (const file of req.files) {
            let image = await cloudinary.v2.uploader.upload(file.path);

            req.body.post.images.push({
                url: image.secure_url,
                public_id: image.public_id
            });
        }
        // database upload
        let post = await Post.create(req.body.post);

        res.redirect(`/posts/${post._id}`);
    },

    // Mostrar Post - posts/:id
    async postShow(req, res, next) {
        let post = await Post.findById(req.params.id);

        res.render('posts/show', {post: post});
    },

    // Editar Post - posts/edit/:id
    async postEdit(req, res, next) {
        let post = await Post.findById(req.params.id);

        res.render('posts/edit', {post: post});
    },

    // Actualizar Post - posts/:id
    async postUpdate(req, res, next) {
        let post = await Post.findByIdAndUpdate(req.params.id, req.body.post);

        res.redirect(`/posts/${post._id}`);
    },

    // Eliminar Post - posts/:id
    async postDestroy(req, res, next) {
        await Post.findByIdAndDelete(req.params.id);

        res.redirect('/posts');
    }
}