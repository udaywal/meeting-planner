const mongoose = require('mongoose')
//const jwt = require('jsonwebtoken')
//const request = require("request")
const Auth = require('../models/Auth')

const logger = require('../libs/loggerLib')
const responseLib = require('../libs/responseLib')
const token = require('../libs/tokenLib')
const check = require('../libs/checkLib')

let isAuthorized = (req, res, next) => {
/* Here you are accepting token where it is in params/query/body/header ...
 But ideal approach is to only attach authToken from client side in the headers which is an industry practice 
 for safety purpose. */
  if (req.params.authToken || req.query.authToken || req.body.authToken || req.header('authToken')) {
    // finding user through authToken in 'auth collection'
    Auth.findOne({authToken: req.header('authToken') || req.params.authToken || req.body.authToken || req.query.authToken}, (err, authDetails) => {
      if (err) {
        console.log(err)
        logger.error(err.message, 'AuthorizationMiddleware', 10)
        let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
        res.send(apiResponse)
      } else if (check.isEmpty(authDetails)) {
        logger.error('No AuthorizationKey Is Present', 'AuthorizationMiddleware', 10)
        let apiResponse = responseLib.generate(true, 'Invalid Or Expired AuthorizationKey', 404, null)
        res.send(apiResponse)
      } else {
        // Checking that password may decrypted or not
        token.verifyToken(authDetails.authToken, authDetails.tokenSecret, (err, decoded)=>{
            if(err){
                logger.error(err.message, 'Authorization Middleware', 10)
                let apiResponse = responseLib.generate(true, 'Failed To Authorized', 500, null)
                res.send(apiResponse)
            }
            else{
              console.log(`req.user is - ${req.user}`)
              console.log(decoded)
              // setting 'user' in request object
              // One of the middlewares functionality that we can edit request object through middlewares
                req.user = {userId: decoded.data.userId} // see logout controller to understand this
                next()
            }
        });// end verify token
      }
    })

  } else {
    logger.error('AuthorizationToken Missing', 'AuthorizationMiddleware', 5)
    let apiResponse = responseLib.generate(true, 'AuthorizationToken Is Missing In Request', 400, null)
    res.send(apiResponse)
  }
}

module.exports = {
  isAuthorized: isAuthorized
}
