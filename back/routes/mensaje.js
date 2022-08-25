const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');

/* Post with register data */
router.get('/userId', mensajeController.getMensajes);
router.post('/create',mensajeController.createConvo);

module.exports = router;
