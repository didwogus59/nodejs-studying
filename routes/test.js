const express = require('express')
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.get('/',csrfProtection, function (req, res) {
    res.render('form_post',{csrfToken: req.csrfToken()});
}).post('/', csrfProtection, function (req, res) {
    res.status(200).json({"title":req.body.title, "content":req.body.content})
})

module.exports = router;