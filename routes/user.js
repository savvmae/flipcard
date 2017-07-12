const express = require('express');
const router = express.Router();
const data = require('../data.json');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const fs = require('file-system');


// middleware to ensure authentication on each route, cannot be implemented through postman
// application.use(function (request, response, next) {
//     if (request.session.isAuthenticated === undefined || request.session.isAuthenticated === false) {
//         return response.status(400).json({ message: "You're not authenticated." });
//     }
//     else if (request.session.isAuthenticated === true) {
//         next();
//     }
// });


router.post('/api/signup', (request, response) => {
    if (request.body.email && request.body.password) {
        var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
        var user = {
            email: request.body.email,
            password: hashed,
        }
        data.users.push(user);
        request.session.isAuthenticated = true;
        var itemsJSON = JSON.stringify(data);
        fs.writeFileSync('data.json', itemsJSON);
        return response.status(200).json(data);

    } else {
        return response.status(400).json({ message: "Failed Signup" });
    }
});

router.post('/api/login', (request, response) => {
    var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
    var user = data.users.find(user => { return user.email === request.body.email && user.password === hashed });

    if (user) {
        request.session.isAuthenticated = true;
        return response.status(200).json({ message: "Success" });
    }
    else {
        return response.status(400).json({ message: "Failed Login" });
    }
});

router.post('/api/logout', (request, response) => {
    request.session.destroy();
    return response.status(200).json({ message: "successfully logged out" });
});

module.exports = router;