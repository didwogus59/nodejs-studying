const express = require("express");
const router = express.Router();

const {loginUser_jwt, signUser, signPage, loginPage, loginUser_session} = require('../controllers/user_controller');

router.route('/sign').get(signPage).post(signUser)
router.route('/login').get(loginPage).post(loginUser_jwt);
router.route('/login/session').get(loginPage).post(loginUser_session);
module.exports = router; 