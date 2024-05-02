const express = require('express');
const router = express.Router();

// Import your authentication controller
const { LoginUser } = require('../controllers/Validate');

// Define routes for user authentication
router.post('/login', LoginUser);

module.exports = router;
