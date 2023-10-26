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
const MongoStore = require('connect-mongo');

const homePage = require('./routes/home');
const formPage = require('./routes/form_router')
const dbPage = require('./routes/db_router')
const userPage = require('./routes/user_router'); 
const boardPage = require('./routes/board_router')

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// middleware

app.use(session({
  secure: false,
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    dbName: "nodejs",
    ttl : 30*60,
    autoRemove: 'interval',
    autoRemoveInterval : 10
  }),
  cookie: { secure: false , maxAge: 3600000 }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json());


//routers
app.use('/form', formPage);
app.use('/db', dbPage);
app.use('/user',csrfProtection,userPage);
app.use('/board',authorization, boardPage)

app.use('/', authorization, homePage);


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
