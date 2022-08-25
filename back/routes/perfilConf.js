const express = require('express');
const router = express.Router();
const perfilConfController = require('../controllers/perfilConfController');

/* Post with register data */
router.post('/filters', perfilConfController.saveFilters);
router.post('/date', perfilConfController.saveCheckDate);



module.exports = router;
