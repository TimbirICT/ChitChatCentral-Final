const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser } = require('../controllers/userController');

// Route to create a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await loginUser(username, password);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Route to log out a user (invalidate token, etc.)
router.post('/logout', async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await logoutUser(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;