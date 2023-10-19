require('dotenv').config();
const http = require('http');
var cookieParser = require('cookie-parser')
var express = require('express')
var bodyParser = require('body-parser');
const ejs = require('ejs');
const connectDB = require('./db/connect');
const homePage = require('./routes/home');
const testPage = require('./routes/test')

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

// middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json());
//routers
app.use('/', homePage);
app.use('/', testPage);


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
