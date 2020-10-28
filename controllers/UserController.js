const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');

const userController = Router();

/*
  TODO: register user - '/register'
  POST Request
*/
userController.post('/register', async (req, res) => {

  let { email, username, password } = req.body;
  try {
    await User.create({
      email,
      username,
      password: bcrypt.hashSync(password, 12)
    });
    res.status(201).json({
      message: 'User registered!'
    });
  } catch (error) {
      res.status(500).json({
        message: 'Failed to register user'
      });
  }
});

/*
  TODO: login user - '/login'
  POST Request
*/
userController.post('/login', (req, res) => {
  res.send('hello from the login route');
});

module.exports = userController;