const express = require('express')
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const {form_get, form_post} = require('../controllers/form_test')
const router = express.Router();

router.get('/',csrfProtection, form_get).post('/', csrfProtection, form_post)

module.exports = router;