const express = require('express');
const router = express.Router();

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// The middleware functions also need to be required
const {
      validateUserId,
      validateUser,
      validatePost
      } = require('../middleware/middleware');
const server = require('../server');
const { json } = require('express/lib/response');



router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users => {
    res.status(200).json(users)
    next()
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(next)


});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(removed => {
    res.status(200).json(req.user)
  })
  .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Posts.get()
  .then(posts => { 
    res.status(200).json(posts.filter(post => post.user_id === Number(req.params.id)))
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postInfo = {...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
  .then(post => {
    console.log({user_id: req.params.id, text: post })
    res.status(201).json(post)
  })
  .catch(next)
});


router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: 'Something went wrong in the users router',
    error: err.message
  })
})



// do not forget to export the router
module.exports = router;
