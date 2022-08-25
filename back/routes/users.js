var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')


/* GET users listing. */
router.post('/name', userController.idByName);
router.post('/id',userController.nameById);
router.post('/delete', userController.borrarUsuario);
router.post('/getUsers',userController.getUsersParam);
router.get('/getUsers',userController.getUsersNoParam);
router.get('/date',userController.lastCheck);


module.exports = router;
