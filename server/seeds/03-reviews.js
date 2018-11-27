
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("reviews").insert([
        {
          review_id: 1,
          project_id: 2,
          user_id: 2,
          rating: 18,
          img_url: 'imageurl',
          text: 'Fun!',
          likes: 0,
          dislikes: 0,
          helpfulness: 13
        },
        {
          review_id: 2,
          project_id: 3,
          user_id: 1,
          rating: 24,
          img_url: 'imageurl',
          text: 'Nice!',
          likes: 2,
          dislikes: 1,
          helpfulness: 19
        },
        {
          review_id: 3,
          project_id: 3,
          user_id: 2,
          rating: 9,
          img_url: 'imageurl',
          text: 'Cool!',
          likes: 1,
          dislikes: 0,
          helpfulness: 7
        }
      ]);
    });
};
