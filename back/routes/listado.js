const express = require('express');
const router = express.Router();
const listadoController = require('../controllers/listadoController')

/* Post with register data */
router.get('/', listadoController.getOffersNoParam);
router.post('/', listadoController.getOffersParam);
router.post('/crearOferta',listadoController.createOffer);



module.exports = router;
