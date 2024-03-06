const User = require('../models/User'); // Import your user model

const createUser = async (username, password) => {
  try {
    const user = new User({ username, password });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !user.comparePassword(password)) {
      throw new Error('Invalid username or password');
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async (userId) => {
  try {
    // Perform any necessary actions for logging out the user
    // For example, you might want to remove the user's token from a blacklist

    return { message: 'User successfully logged out' };
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, loginUser, logoutUser };