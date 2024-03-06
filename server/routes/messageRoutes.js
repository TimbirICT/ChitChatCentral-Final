const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messagesController');

// Route to send a new message
router.post('/send', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const result = await sendMessage(userId, message);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all messages
router.get('/all', async (req, res) => {
  try {
    const messages = await getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;