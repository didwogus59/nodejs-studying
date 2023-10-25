const express = require("express");
const router = express.Router();

const {loginUser, signUser, signPage, loginPage} = require('../controllers/user_controller');

router.route('/sign').get(signPage).post(signUser)
router.route('/login').get(loginPage).post(loginUser);

module.exports = router; 