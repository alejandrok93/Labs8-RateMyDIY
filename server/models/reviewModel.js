const db = require('../config/dbConfig');
// const Promise = require('bluebird');

module.exports = {
	getReview,
	getReviewID,
	addReview,
	editReview,
	removeReview
};

function getReview(review_id) {
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
																	// This returns whole stars
																	// project_rating: Math.round(
																	// 	project_rating_sum / project_rating_count
																	// ),
																	// This returns half stars
																	project_rating: (
																		Math.round(
																			(project_rating_sum /
																				project_rating_count) *
																				2
																		) / 2
																	).toFixed(1),
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
																							// // This returns whole stars
																							// user_rating: Math.round(
																							// 	user_rating_sum /
																							// 		user_rating_count
																							// ),
																							// This returns half stars
																							user_rating: (
																								Math.round(
																									(user_rating_sum /
																										user_rating_count) *
																										2
																								) / 2
																							).toFixed(1),
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

// This is big and ugly but it works. It would be easier to read with async/await
function editReview({ user_id, review_id, project_id, rating, text }) {
	// Make sure the review exists and the user is the author
	return db('reviews')
		.where({ user_id, review_id })
		.first()
		.then(review => {
			if (!review) {
				// No review by that id and author
				return { reviewNotFound: true };
			} else {
				// Hold onto the previous rating for later.
				const previous_rating = review.rating;
				// Update the review
				return db.transaction(trx => {
					return trx('reviews')
						.where({ user_id, review_id })
						.update({ rating, text }, 'review_id')
						.then(([updated]) => {
							if (!updated) {
								// Something went wrong updating the review
								trx.rollback;
							} else {
								// Do we need to update the average ratings?
								if (rating == previous_rating) {
									// Nope, just had to update the review text
									return { review_id };
								} else {
									// Yep. Let's go update the averages
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
												project_rating_sum += rating - previous_rating;
												return trx('projects')
													.where({ project_id })
													.update(
														{
															// // This returns whole stars
															// project_rating: Math.round(
															// 	project_rating_sum / project_rating_count
															// ),
															// This returns half stars
															project_rating: (
																Math.round(
																	(project_rating_sum / project_rating_count) *
																		2
																) / 2
															).toFixed(1),
															rating_sum: project_rating_sum
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
																	({ user_rating_sum, user_rating_count }) => {
																		user_rating_sum += rating - previous_rating;
																		return db('users')
																			.where({ user_id: maker_id })
																			.update(
																				{
																					// // This returns whole stars
																					// user_rating: Math.round(
																					// 	user_rating_sum / user_rating_count
																					// ),
																					// This returns half stars
																					user_rating: (
																						Math.round(
																							(user_rating_sum /
																								user_rating_count) *
																								2
																						) / 2
																					).toFixed(1),
																					rating_sum: user_rating_sum
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
							}
						});
				});
			}
		});
}

// This is big and ugly but it works. It would be easier to read with async/await
function removeReview(user_id, review_id) {
	// Make sure the review exists and the user is the author
	return db('reviews')
		.where({ user_id, review_id })
		.first()
		.then(review => {
			if (!review) {
				// No review by that id and author
				return { reviewNotFound: true };
			} else {
				console.log(
					`\nUser ${user_id} attempting to delete review ${review_id}\n...`
				);
				// Hold onto the rating for later.
				const { project_id, rating } = review;
				// Delete the review
				return db.transaction(trx => {
					return trx('reviews')
						.where({ user_id, review_id })
						.del()
						.then(deleted => {
							if (!deleted) {
								// Something went wrong deleting the review
								trx.rollback;
							} else {
								// Update the projects table
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
											project_rating_sum -= rating;
											project_rating_count--;
											return trx('projects')
												.where({ project_id })
												.update(
													{
														// // This returns whole stars
														// project_rating: Math.round(
														// 	project_rating_sum / project_rating_count
														// ),
														// This returns half stars
														project_rating: (
															Math.round(
																(project_rating_sum / project_rating_count) * 2
															) / 2
														).toFixed(1),
														rating_sum: project_rating_sum,
														rating_count: project_rating_count
													},
													'project_id'
												)
												.then(([project_updated]) => {
													if (!project_updated) {
														trx.rollback;
													} else {
														// Update the users table
														return trx('users')
															.where({ user_id: maker_id })
															.select(
																'rating_sum as user_rating_sum',
																'rating_count as user_rating_count'
															)
															.first()
															.then(
																({ user_rating_sum, user_rating_count }) => {
																	user_rating_sum -= rating;
																	user_rating_count--;
																	return db('users')
																		.where({ user_id: maker_id })
																		.update(
																			{
																				// // This returns whole stars
																				// user_rating: Math.round(
																				// 	user_rating_sum / user_rating_count
																				// ),
																				// This returns half stars
																				user_rating: (
																					Math.round(
																						(user_rating_sum /
																							user_rating_count) *
																							2
																					) / 2
																				).toFixed(1),
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
											console.log('deleted', deleted);
											return { deleted };
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
