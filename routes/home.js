require('dotenv').config()
const express = require('express')
const router = express.Router();

router.route('/').get((req, res) => {
    console.log(req.session.user)
    console.log(req.name)
    if(req.session.user) {
      return res.status(200).render('home', {name:req.session.user.name, login:"session"});
    }
    if(req.name) {
      return  res.status(200).render('home', {name:req.name, login: "JWT"});
    }
    
    return  res.status(200).render('home');
});

router.get('/test', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

module.exports = router;