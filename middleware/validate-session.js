const { request } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const ValidateJWTMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    let sessionToken = req.headers.authorization;

    if (!sessionToken) {
      return res.status(403).send( { auth: false, message: 'no token provided' } );
    } else {
      jwt.verify(sessionToken, process.env.JWT_SECRET, (error, decoded) => {
        if (decoded) {
          User.findOne({
            where: {
              id: decoded.id,
            }
          })
          .then(
            user => {
              req.user = user;
              next();
          },
          () => {
            res.status(401).send( { error: "not authorized" } );
          })
        } else {
          res.status(400).send( { error: 'not authorized' } )
        }
      });
    }
  }
}

module.exports = ValidateJWTMiddleware;