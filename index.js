// All our requires/dependencies
var express = require('express')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')
var mongoose = require('mongoose')



// Here we find an appropriate database to connect to, defaulting to
 // localhost if we don't find one.
 var uristring = "mongodb://heroku_4b90s6m1:roeiso6s6840c1qbt8elvbbgh1@ds011873.mlab.com:11873/heroku_4b90s6m1"

 // Makes connection asynchronously.  Mongoose will queue up database
 // operations and release them when the connection is complete.
 mongoose.connect(uristring, function (err, res) {
   if (err) {
   console.log ('ERROR connecting to: ' + uristring + '. ' + err);
   } else {
   console.log ('Succeeded connected to: ' + uristring);
   }
 });

// // Connect to our Mongo database, using Mongoose
// mongoose.connect('mongodb://localhost:27017/hackerwall-solution')

// Including our Models
var Post = require('./models/posts')

// Creating our Application
var app = express()

// Registering and using our template engine
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Serving static files (like css)
app.use(express.static('public'));

// Use Body Parser
app.use(bodyParser.urlencoded({extended: true}))

// Routes
app.get('/', function( req , res ) {

  Post.find({}, function( err, posts ) {

    res.render('index', { posts: posts })

  })

})

app.get('/posts/:id', function( req, res ) {

  Post.findById( req.params.id, function( err, post ){

    res.render( 'posts/post', { post: post } )

  })

})

app.post('/posts/:id', function( req, res ) {

  console.log( req.body )

  Post.findById( req.params.id, function( err, post ){

    post.comments.push( req.body )
    post.save()

    res.render( 'posts/post', { post: post } )

  })

})

app.get('/posts/new', function( req , res ) {

  res.render('posts/new')

})

app.post('/posts', function( req , res ) {

  var newPost = new Post({
    postUrl: req.body.postUrl,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description
  })

  newPost.save()

  res.redirect('/')

})

app.listen( process.env.PORT || 3000, function() {

  console.log( 'listening on 3000' )

})
