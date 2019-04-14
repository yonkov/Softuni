const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
require('./config/database')(config);
require('./config/express')(app);

app.use(express.static(path.join(__dirname, 'front-end/dist/interceptors-exercise')));


app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname+'/front-end/dist/interceptors-exercise/index.html'));
 });

app.listen(config.port, console.log("Listening on port " + config.port + "..."));