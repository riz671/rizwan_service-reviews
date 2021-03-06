const db = require('../index.js');
const reviewGenerator = require('../seeds/reviewsGenerator.js');

const model = {
  getByProdId: (id, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  getBySkinType: (id, skinType, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND skinType = '${skinType}';`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  searchReviews: (id, queryString, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND to_tsvector(productName || ' ' || reviewTitle || ' ' || reviewText || ' ' || bottomLine) @@ to_tsquery('${queryString}');`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  getByProdIdSort: (id, column, order, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} ORDER BY ${column} ${order};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  getBySkinShade: (id, skinShade, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND skinShade = '${skinShade}';`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  getByAgeRange: (id, ageRange, callback) => {
    let queryStr = `SELECT * FROM reviews INNER JOIN products ON reviews.product_id = products.id WHERE product_id = ${id} AND ageRange = '${ageRange}';`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  postUpVote: (id, callback) => {
    let queryStr = `UPDATE reviews SET votes_up = votes_up + 1 WHERE review_id=${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  postDownVote: (id, callback) => {
    let queryStr = `UPDATE reviews SET votes_down = votes_down + 1 WHERE review_id=${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  postNewReview: (body, id, callback) => {
    // for testing
    let queryStr = `INSERT INTO reviews (productId, productName, user_id, reviewTitle, reviewText, rating, bottomLine, votes_down, votes_up, verified_buyer, reviewTime) VALUES (${id}, "Lash Stick", 3, "A waste of practical Lash Stick!", "${body.reviewText}", 2.2, "No - I would not recommend this to a friend", 13, 5, false, "5/1/2011");`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },

  deleteReviewById: (id, callback) => {
    let queryStr = `DELETE FROM reviews WHERE reviewId = ${id};`;

    db.query(queryStr, (err, result) => {
      err ? callback(err, null) : callback(null, result);
    });
  },
};

module.exports = model;
