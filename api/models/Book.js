var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  author: String,
});

export const Book = mongoose.model("Book", BookSchema);
