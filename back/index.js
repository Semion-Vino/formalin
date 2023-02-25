const express = require('express');
//const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');
const mongoose = require('mongoose');

/* const logger = wlog(); */
const router = require('./router');
const port = process.env.PORT || 666;
db.connect();
const app = express();

//TODO REMOVE NO CORS
/* const cors = require('cors');
app.use(
  cors({
    origin: '*'
  })
); */

/* app.use(express.json()); */

app.use(
  express.json()
);
deployPath = process.cwd();
app.use(express.static(path.join(deployPath, '/front/public')));
app.use(router);

app.listen(port, () => console.log(`Listening on port ${port}`));

