const { getById } = require('../users/users-model')


function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`)
  next()
}

function validateUserId(req, res, next) {
  const { id } = req.params
  getById(id)
  .then(user => {
    if(user){
      req.user = user
      console.log('validate user id')
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
    if(req.body.name){
      next()
    }
    else{
      res.status(400).json({
        message: 'missing required name field'
      })  
    }
}



 function validatePost(req, res, next) {
   console.log('validate post')
  if(!req.body.text){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else{
    // res.status(200).json(req.body.text) 
    next()
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}