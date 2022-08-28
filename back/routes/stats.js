const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController')

/* Post with register data */
router.get('/offersCreated', statsController.getOffersCreatedByDay);
router.get('/offersFilters', statsController.getOffersByFilters);



module.exports = router;
