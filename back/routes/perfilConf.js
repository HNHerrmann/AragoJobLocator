const express = require('express');
const router = express.Router();
const perfilConfController = require('../controllers/perfilConfController');

/* Post with register data */
router.post('/filters', perfilConfController.saveFilters);

module.exports = router;
