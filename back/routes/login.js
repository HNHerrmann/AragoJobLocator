const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

/* Post with register data */
router.post('/logout',loginController.logout);
router.post('/', loginController.login);
router.get('/', loginController.islogged);


module.exports = router;
