const db = require('../config/dbConfig');

module.exports = {
	getReview,
	getReviewID,
	addReview
	// editReview,
	// removeReview,
	// updateProjectRating,
	// updateUserRating
};

function getReview(review_id) {
	console.log('reviewModel review_id:', review_id);

	return db('reviews')
		.where({ review_id })
		.join('users as reviewers', 'reviewers.user_id', 'reviews.user_id')
		.join('projects', 'projects.project_id', 'reviews.project_id')
		.join('users as makers', 'makers.user_id', 'projects.user_id')
		.select(
			'reviews.review_id',
			'makers.user_id as maker_id',
			'makers.username as maker_name',
			'reviews.project_id',
			'projects.project_name',
			'reviews.user_id as reviewer_id',
			'reviewers.username as reviewer_name',
			'projects.img_url',
			'reviews.rating',
			'reviews.text'
		)
		.first();
}

function getReviewID(project_id, user_id) {
	return db('reviews')
		.where({ project_id, user_id })
		.first()
		.then(review => (review ? review.review_id : undefined));
}

// Currently, project ratings and user ratings get recalculated whenever a review is added, updated, or deleted. Instead of telling the database to select all the relevant reviews, sum them up, and return an average every time this happens, we just hold onto a rating_sum and a rating_count for each user and project. This ought to put less strain on the database but the results are susceptible to inaccuracy: If a review is modified or deleted without going through the reviewModel (due to a bug or some other issue), the average rating might not get updated. Perhaps we can schedule periodic exhaustive recalculations to maintain accuracy.

// SOON TO BE REPLACED WITH SQL TRANSACTIONS
function addReview({ user_id, project_id, rating, text }) {
	return db('projects')
		.where(user_id, project_id)
		.first()
		.then(project => {
			// Are you the author of this project?
			if (!project) {
				return db('reviews')
					.where({ user_id, project_id })
					.first()
					.then(review => {
						// Have you already reviewed this project?
						if (!review) {
							return db('reviews')
								.returning('review_id')
								.insert({ user_id, project_id, rating, text })
								.then(([review_id]) => review_id);
						} else return 'alreadyReviewed'; // You've already reviewed this project
					});
			} else return 'ownProject'; // Can't review your own project
		});
}

// // Update the project's rating - BROKEN DON'T USE
// function updateProjectRating(project_id, rating) {
// 	return db('projects')
// 		.where(project_id)
// 		.select(
// 			'user_id as maker_id',
// 			'project_rating',
// 			'rating_sum',
// 			'rating_count'
// 		)
// 		.first()
// 		.then(({ maker_id, rating_sum, rating_count }) => {
// 			rating_sum += rating;
// 			rating_count++;
// 			return db('projects')
// 				.where(project_id)
// 				.returning('project_id')
// 				.update({
// 					project_rating: Math.round(rating_sum / rating_count),
// 					rating_sum,
// 					rating_count
// 				})
// 				.then(([project_updated]) => {
// 					if (project_updated) {
// 						return maker_id;
// 					} else {
// 						return undefined;
// 					}
// 				});
// 		});
// }

// // Update the user's rating - BROKEN DON'T USE
// function updateUserRating(maker_id, rating) {
// 	return db('users')
// 		.where({ user_id: maker_id })
// 		.select(
// 			'rating_sum as user_rating_sum',
// 			'rating_count as user_rating_count'
// 		)
// 		.first()
// 		.then(({ user_rating_sum, user_rating_count }) => {
// 			user_rating_sum += rating;
// 			user_rating_count++;
// 			return db('users')
// 				.where({ user_id: maker_id })
// 				.returning('user_id')
// 				.update({
// 					user_rating: Math.round(user_rating_sum / user_rating_count),
// 					user_rating_sum,
// 					user_rating_count
// 				})
// 				.then(([user_updated]) => user_updated);
// 		});
// }

// function editReview(user_id, review_id, changes) {
// 	return db('reviews')
// 		.where({ user_id, review_id })
// 		.returning('review_id')
// 		.update(changes)
// 		.then(ids => ids.length);
// }

// function removeReview(user_id, review_id) {
// 	return db('reviews')
// 		.where({ user_id, review_id })
// 		.del();
// }
