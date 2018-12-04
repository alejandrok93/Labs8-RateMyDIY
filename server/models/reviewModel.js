const db = require('../config/dbConfig');
// const Promise = require('bluebird');

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

// This is big and ugly but it works. It would be easier to read with async/await
function addReview({ user_id, project_id, rating, text }) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			// Does this project exist?
			if (!project) {
				// Project not found
				return { projectNotFound: true };
			}
			// Are you the author of this project?
			else if (project.user_id === user_id) {
				// Can't review your own project
				return { ownProject: true };
			} else {
				return db('reviews')
					.where({ user_id, project_id })
					.first()
					.then(review => {
						// Have you already reviewed this project?
						if (review) {
							// Can't leave multiple reviews for the same project
							return { alreadyReviewed: true };
						} else {
							return db.transaction(trx => {
								return trx('reviews')
									.insert({ user_id, project_id, rating, text }, 'review_id')
									.then(([review_id]) => {
										if (!review_id) {
											trx.rollback;
										} else {
											return trx('projects')
												.where({ project_id })
												.select(
													'user_id as maker_id',
													'rating_sum as project_rating_sum',
													'rating_count as project_rating_count'
												)
												.first()
												.then(
													({
														maker_id,
														project_rating_sum,
														project_rating_count
													}) => {
														project_rating_sum += rating;
														project_rating_count++;
														return trx('projects')
															.where({ project_id })
															.update(
																{
																	// This only returns whole numbers. Has to be modified for half stars.
																	project_rating: Math.round(
																		project_rating_sum / project_rating_count
																	),
																	rating_sum: project_rating_sum,
																	rating_count: project_rating_count
																},
																'project_id'
															)
															.then(([project_updated]) => {
																if (!project_updated) {
																	trx.rollback;
																} else {
																	return trx('users')
																		.where({ user_id: maker_id })
																		.select(
																			'rating_sum as user_rating_sum',
																			'rating_count as user_rating_count'
																		)
																		.first()
																		.then(
																			({
																				user_rating_sum,
																				user_rating_count
																			}) => {
																				user_rating_sum += rating;
																				user_rating_count++;
																				return db('users')
																					.where({ user_id: maker_id })
																					.update(
																						{
																							// This only returns whole numbers. Has to be modified for half stars.
																							user_rating: Math.round(
																								user_rating_sum /
																									user_rating_count
																							),
																							rating_sum: user_rating_sum,
																							rating_count: user_rating_count
																						},
																						'user_id'
																					);
																			}
																		);
																}
															});
													}
												)
												.then(([user_updated]) => {
													if (!user_updated) {
														trx.rollback;
													} else {
														console.log(
															`Average ratings updated for project ${project_id} and user ${user_updated}`
														);
														return { review_id };
													}
												})
												.catch(error => {
													console.error(error);
													return {};
												});
										}
									});
							});
						}
					});
			}
		});
}

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
