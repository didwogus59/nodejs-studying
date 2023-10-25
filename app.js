require('dotenv').config();
var cookieParser = require('cookie-parser')
var express = require('express')
var bodyParser = require('body-parser');
const ejs = require('ejs');
const connectDB = require('./db/connect');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const authorization = require("./middleware/auth")
const session = require("express-session")
const MemoryStore = require('memorystore')(session);

const homePage = require('./routes/home');
const formPage = require('./routes/form_router')
const dbPage = require('./routes/db_router')
const user_route = require('./routes/user_router'); 


const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// middleware

app.use(session({
  secure: false,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json());


//routers
app.get('/test2', (req, res, next) => {
  console.log(req.session)
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
app.use('/', authorization, homePage);
app.use('/form', formPage);
app.use('/db', dbPage);
app.use('/user',csrfProtection,user_route);



const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
