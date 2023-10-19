const express = require('express')
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.get('/',csrfProtection, function (req, res) {
    res.render('form_post',{csrfToken: req.csrfToken()});
}).post('/', csrfProtection, function (req, res) {
    res.send('data is being processed')
})

module.exports = router;