const express = require('express')
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const {form_get, form_post,form_get_csrf, form_post_csrf} = require('../controllers/form_controller')
const router = express.Router();

router.route('/csrf').get(csrfProtection, form_get_csrf).post(csrfProtection, form_post_csrf)

router.route('/').get(form_get).post(form_post)
module.exports = router;