const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

/* Post with register data */
router.post('/user', perfilController.getUser);

module.exports = router;
