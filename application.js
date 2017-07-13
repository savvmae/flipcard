const express = require('express');
const fs = require('file-system');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mustacheExpress = require('mustache-express');
const data = require('./data.json');
const session = require('express-session');
const usersRouter = require('./routes/user.js');
const flipcardRouter = require('./routes/flipcard.js');

const application = express();

application.engine('mustache', mustacheExpress());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(session({
    secret: 'iAmASecret',
    saveUninitialized: true,
    resave: false
}));
application.use(express.static(__dirname + '/public'));

application.use(bodyParser.urlencoded());

application.use(usersRouter);
application.use(flipcardRouter);

application.listen(3000);


module.exports = application;
