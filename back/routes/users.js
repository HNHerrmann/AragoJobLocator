var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')


/* GET users listing. */
router.post('/name', userController.userByName);
router.post('/delete', userController.borrarUsuario);
router.post('/getUsers',userController.getUsersParam);
router.get('/getUsers',userController.getUsersNoParam);

module.exports = router;
