var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
  postUrl: String,
  author: String,
  title: String,
  description: String,
  comments: Array
})

var Post = mongoose.model( 'Post', postSchema )

module.exports = Post
