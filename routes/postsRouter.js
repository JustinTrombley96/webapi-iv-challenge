const express = require('express');

const router = express.Router();
const Posts = require('../data/db');
// 100% Functional
router.get('/', (req, res) => {
	Posts.find()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(err => {
			res.status(500).json({ error: 'The posts information could not be retrieved.' });
		});
});
//100% Functional
router.get('/:id', (req, res) => {
	const postId = req.params.id;

	Posts.findById(postId)
		.then(data => {
			if (data[0]) {
				res.status(200).json(data);
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'The post information could not be retrieved.' });
		});
});
//100% Functional
router.get('/:id/comments', (req, res) => {
	const postId = req.params.id;

	Posts.findPostComments(postId)
		.then(data => {
			if (data[0]) {
				res.status(201).json(data);
				console.log(data);
			} else {
				console.log(data);
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error : 'The comments information could not be retrieved.',
			});
		});
});
//100% Functional
router.post('/', (req, res) => {
	const newPost = req.body;
	if (!newPost.title || !newPost.contents) {
		res.status(400).json({
			errorMessage : 'Please provide title and contents for the post.',
		});
	}
	Posts.insert(newPost)
		.then(data => {
			res.status(201).json(data);
		})
		.catch(err => {
			res.status(500).json({
				error : 'There was an error while saving the post to the database',
			});
		});
});
// Not functional
router.post('/:id/comments', (req, res) => {
	let commentText = req.body;
	const postId = req.params.id;
	// add post_id property to req.body object
	commentText.post_id = postId;
	// if text doesn't exist within request header, return error
	if (!commentText) {
		return res.status(400).json({ errorMessage: 'Please provide text for the comment' });
	} else {
		commentText.text = commentText.text.trim();
	}
	// checks to see if the post_id provided by request header exists
	// if it doesn't, return a 404 (not found) error
	BlogData.findById(postId)
		.then(post => {
			if (post.length === 0) {
				return res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
			// Add comment to post
			BlogData.insertComment(commentText)
				.then(comment => {
					res.status(201).json({ comment });
				})
				.catch(error => {
					res.status(500).json({ error: 'There was an error while saving the comment to the database' });
				});
		})
		.catch(error => {
			// this catch applies to the findById()
			return res.status(500).json({ error: 'The post information could not be retrieved.' });
		});
});

//100% functional
router.delete('/:id', (req, res) => {
	const postId = req.params.id;
	Posts.remove(postId)
		.then(post => {
			if (post) {
				res.status(201).json({ message: 'You have successfully deleted this.' });
			} else {
				res.status(404).json({ message: 'The post with the specified ID does not exist.' });
			}
		})
		.catch(err => {
			res.status(500).json({
				error : 'The post could not be removed',
			});
		});
});

module.exports = router;
