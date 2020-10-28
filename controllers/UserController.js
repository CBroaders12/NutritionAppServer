const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');

const userController = Router();

/*
  register user - '/register'
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
    // TODO: Add in specific error when username or password is already registered
      res.status(500).json({
        message: 'Failed to register user'
      });
  }
});

/*
  login user - '/login'
  POST Request
*/
userController.post('/login', async (req, res) => {
  let { username, password } = req.body;
  try {
    let loginUser = await User.findOne( { where: { username } } );
    if ( loginUser && await bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET);
      res.status(200).json({
        message: 'Login successful',
        token
      });
    } else {
      res.status(401).json({
        message: 'Login failed'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in'
    });
  }
});

module.exports = userController;