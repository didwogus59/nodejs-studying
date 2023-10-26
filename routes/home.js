require('dotenv').config()
const express = require('express')
const router = express.Router();

router.route('/').get((req, res) => {
  if(req.session.user) {
    return res.status(200).render('home', {user: req.session.user, login:"session"});
  }
  if(req.user) {
    return  res.status(200).render('home', {user: req.user, login: "JWT"});
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