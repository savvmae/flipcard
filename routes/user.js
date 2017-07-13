const express = require('express');
const router = express.Router();
const data = require('../data.json');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const fs = require('file-system');

router.get('/', (request, response) => {
    return response.render('login');
});

router.get('/api/signup', (request, response) => {
    return response.render('signup');
});

router.post('/api/signup', (request, response) => {
    var user = data.users.find(user => { return user.email === request.body.email });
    if (user) {
        // return response.status(400).json({ message: "Email already registered" });
        return response.redirect('/');
    }
    else if (request.body.email && request.body.password) {
        var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
        var user = {
            email: request.body.email,
            password: hashed,
        }
        data.users.push(user);
        request.session.isAuthenticated = true;
        var itemsJSON = JSON.stringify(data);
        fs.writeFileSync('data.json', itemsJSON);
        return response.render('dashboard');
        // return response.status(200).json({ email: user.email, message: "Success" });

    } else {
        return response.status(400).json({ message: "Missing Data Fields" });
    }
});

router.post('/api/login', (request, response) => {

    var hashed = crypto.pbkdf2Sync(request.body.password, 'salt', 10, 512, 'sha512').toString('base64');
    var userEmail = data.users.find(user => { return user.email === request.body.email });
    var userPW = data.users.find(user => { return  user.password === hashed });

    if (userEmail && userPW) {
        request.session.isAuthenticated = true;
        return response.redirect('/api/decks');
        // return response.status(200).json({ message: "Success", data: userEmail.email});
    } else if(userEmail){
        return response.status(400).json({ message: "Incorrect password" });
    }
    else {
        return response.redirect('/api/signup');
        // return response.status(400).json({ message: "User not found" });
    }
});

router.post('/api/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/');
    // return response.status(200).json({ message: "successfully logged out" });
});

module.exports = router;