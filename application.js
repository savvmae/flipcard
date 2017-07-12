const express = require('express');
const fs = require('file-system');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const data = require('./data.json');
const session = require('express-session');
const usersRouter = require('./routes/user.js');
const flipcardRouter = require('./routes/flipcard.js');

const application = express();

application.use(session({
    secret: 'iAmASecret',
    saveUninitialized: true,
    resave: false
}));

application.use(bodyParser.json());

application.use(usersRouter);
application.use(flipcardRouter);

application.listen(3000);


module.exports = application;
