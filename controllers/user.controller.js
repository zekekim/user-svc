const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @function register
  * @param {Object} req - Express request object
    * @param {string} req.body.username - username
    * @param {string} req.body.email - email
    * @param {string} req.body.password - password
  * @param {Object} res - Express response object
    * @param {string} res.body.token - JWT token
    * @param {string} res.body.error - error message

  * @description Registers a new user
    * @throws {Object} - Returns an object with an error message
  */

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password using Bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    // Send the token back to the client
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * @function login
  * @param {Object} req - Express request object
    * @param {string} req.body.email - email
    * @param {string} req.body.password - password
  * @param {Object} res - Express response object
    * @param {string} res.body.token - JWT token
    * @param {string} res.body.error - error message

  * @description Logs in a user
    * @throws {Object} - Returns an object with an error message
  */

const login =  async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid Credentials');
    }

    // Compare the password using Bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid Credentials');
    }

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    // Send the token back to the client
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

/* Create a function to log the user out */
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'You are now logged out' });
};

/* Create a function to delete the user's account */
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.log(error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  register,
  login
};
