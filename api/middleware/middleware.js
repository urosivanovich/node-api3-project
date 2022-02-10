const { getById } = require('../users/users-model')

function logger(req, res, next) {
  // console.log(`[${req.method}] ${req.url}`)
}

function validateUserId(req, res, next) {
  const { id } = req.params
  getById(id)
  .then(user => {
    console.log(user)
    if(user){
      req.user = user
      next()
    } else {
      res.status(404).json({
        message: 'user not found'
      })
    }
  })
  .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}