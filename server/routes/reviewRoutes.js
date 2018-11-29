const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();

const authorize = require('../config/authMiddleware');

const db = require('../models/reviewModel');

// get review by id
router.get('/:review_id', function(req, res, next) {
	const { review_id } = req.params;

	db.getReview(review_id)
		.then(review => {
			console.log('Returning review:', review);
			if (review) {
				res.status(200).json(review);
			} else {
				res.status(404).json({ error: 'Review not found.' });
			}
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// get review id by project_id and user_id
router.get('/getid/:user_id/:project_id', function(req, res, next) {
	const { project_id, user_id } = req.params;
	console.log(
		`reviewRoutes: getReviewId(project_id: ${project_id}, user_id: ${user_id})`
	);

	db.getReviewID(project_id, user_id)
		.then(review_id => {
			console.log(`Returned review_id ${review_id})`);
			res.status(200).json(review_id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// add review
router.post('/', ensureLoggedIn, authorize, function(req, res, next) {
	const { user_id, project_id, rating, text } = req.body;

	if (!rating || !text) {
		res.status(422).json({ error: 'Missing parameters.' });
	} else if (rating < 1 || rating > 5) {
		res.status(422).json({ error: 'Nice try.' });
	} else {
		const review = { user_id, project_id, rating, text };
		db.addReview(review)
			.then(review_id => review_id)
			.then(review_id => {
				if (review_id === 'ownProject') {
					res.status(403).json({ error: `You can't review your own project.` });
				} else if (review_id === 'alreadyReviewed') {
					res
						.status(422)
						.json({ error: `You've already reviewed this project.` });
				} else {
					res.status(201).json(review_id);
				}
			})

			// BROKEN DON'T USE
			// 		db.updateProjectRating(project_id, rating).then(maker_id => {
			// 			if (maker_id) {
			// 				db.updateUserRating(maker_id, rating).then(user_updated => {
			// 					if (user_updated) {
			// 						res.status(201).json(review_id);
			// 					} else {
			// 						res.status(500).json({
			// 							error: `Failed to update user rating. You're getting this error because something went wrong and the database queries aren't using transactions yet.`
			// 						}); // Todo: refactor reviewModel
			// 					}
			// 				});
			// 			} else {
			// 				res.status(500).json({
			// 					error: `Failed to update user rating. You're getting this error because something went wrong and the database queries aren't using transactions yet.`
			// 				}); // Todo: refactor reviewModel
			// 			}
			// 		});
			// 	}
			// })
			.catch(err => {
				res.status(500).json(err);
			});
	}
});

// NOT READY
// // update review by id
// router.put('/:review_id', ensureLoggedIn, authorize, function(req, res, next) {
// 	const { user_id, review_name, img_url, text } = req.body;
// 	const { review_id } = req.params;

// 	if (!review_name || !img_url || !text) {
// 		res.status(422).json({ error: 'Missing parameters.' });
// 	} else {
// 		const changes = { review_name, img_url, text };
// 		db.editReview(user_id, review_id, changes)
// 			.then(count => {
// 				if (count) {
// 					res.status(200).json(count);
// 				} else {
// 					res.status(404).json({ error: 'Review not found.' });
// 				}
// 			})
// 			.catch(err => {
// 				res.status(500).json(err);
// 			});
// 	}
// });

// NOT READY
// // delete review by id
// router.delete('/:review_id', ensureLoggedIn, authorize, function(
// 	req,
// 	res,
// 	next
// ) {
// 	const { user_id } = req.body;
// 	const { review_id } = req.params;

// 	db.removeReview(user_id, review_id)
// 		.then(count => {
// 			if (count) {
// 				res.status(200).json(count);
// 			} else {
// 				res.status(404).json({ error: 'Review not found.' });
// 			}
// 		})
// 		.catch(err => {
// 			res.status(500).json(err);
// 		});
// });

module.exports = router;
