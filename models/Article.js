var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    required: true
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;