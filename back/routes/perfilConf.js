const express = require('express');
const router = express.Router();
const perfilConfController = require('../controllers/perfilConfController');

/* Post with register data */
router.post('/filters', perfilConfController.saveFilters);
router.post('/date', perfilConfController.saveCheckDate);
router.post('/profile',perfilConfController.savePerfil);
router.get('/profile',perfilConfController.myPerfil);



module.exports = router;
