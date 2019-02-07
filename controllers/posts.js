const Post = require('../models/post');
// Get cloudinary setup
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dxvpgpgoq',
	api_key: '536837126332476',
	api_secret: process.env.CLOUDINARY_SECRET
});
// Get JavaScript SDK for Mapbox
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

module.exports = {
	// Posts Index
	async postIndex(req, res, next) {
		let posts = await Post.find({});
		res.render('posts/index', { posts, title: `Surf Shop - All Posts` });
	},

	// Posts New
	postNew(req, res, next) {
		res.render('posts/new', {title: `Surf Shop - New Post` });
	},

	// Posts Create
	async postCreate(req, res, next) {
		req.body.post.images = [];
		// Add images in cloudinary and req.boy.post
		for (const file of req.files) {
			let image = await cloudinary.v2.uploader.upload(file.path);
			req.body.post.images.push({
				url: image.secure_url,
				public_id: image.public_id
			});
		}
		// Get geo coordinates and save it to the database
		let response = await geocodingClient.forwardGeocode({
			query: req.body.post.location,
			limit: 1
		}).send()
		req.body.post.coordinates = response.body.features[0].geometry.coordinates;

		// Create post
		let post = await Post.create(req.body.post);

		// Set flash message and redirect to show page
		req.session.success = 'Post created successfully!';
		res.redirect(`/posts/${post.id}`);
	},

	// Posts Show
	async postShow(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/show', { post, title: `Surf Shop - ${post.title}`  });
	},

	// Posts Edit
	async postEdit(req, res, next) {
		let post = await Post.findById(req.params.id);
		res.render('posts/edit', { post, title: `Surf Shop - Edit ${post.title}` });
	},

	// Posts Update
	async postUpdate(req, res, next) {
		// find the post by id
		let post = await Post.findById(req.params.id);

		// check if there's any images for deletion
		if (req.body.deleteImages && req.body.deleteImages.length) {
			// assign deleteImages from req.body to its own variable
			let deleteImages = req.body.deleteImages;

			// loop over deleteImages
			for (const public_id of deleteImages) {
				// delete images from cloudinary
				await cloudinary.v2.uploader.destroy(public_id);
				// delete image from post.images
				for (const image of post.images) {
					if (image.public_id === public_id) {
						let index = post.images.indexOf(image);
						post.images.splice(index, 1);
					}
				}
			}
		}
		// check if there are any new images for upload
		if (req.files) {
			// upload images
			for (const file of req.files) {
				let image = await cloudinary.v2.uploader.upload(file.path);
				// add images to post.images array
				post.images.push({
					url: image.secure_url,
					public_id: image.public_id
				});
			}
		}
		// check if is the locaction is different to get new coordinates update both
		if (post.location !== req.body.post.location) {
			// Get geo coordinates and save it to the database
			let response = await geocodingClient.forwardGeocode({
				query: req.body.post.location,
				limit: 1
			}).send()
			post.coordinates = response.body.features[0].geometry.coordinates;
			post.location = req.body.post.location;
		}

		// update the post with any new properties
		post.title = req.body.post.title;
		post.description = req.body.post.description;
		post.price = req.body.post.price;
		// save the updated post into the db
		await post.save();

		// Set flash message and redirect to show page
		req.session.success = 'Post edited successfully!';
		res.redirect(`/posts/${post._id}`);
	},

	// Posts Destroy
	async postDestroy(req, res, next) {
		let post = await Post.findById(req.params.id);
		for (const image of post.images) {
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await post.remove();

		// Set flash message and redirect to posts page
		req.session.success = 'Post deleted successfully!';
		res.redirect('/posts');
	}
}
