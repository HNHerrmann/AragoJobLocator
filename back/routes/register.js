const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController')

/* Post with register data */
router.post('/', registroController.register);

module.exports = router;
