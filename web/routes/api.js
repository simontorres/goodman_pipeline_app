var mongoose = require('mongoose');
var passport = require('passport');
var config  = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../models/User');



router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exist.'});
            }
            res.json({sucess: true, msg: 'Sucessful created new user.'});
        });
    }
});



router.post('/signin', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({sucess: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), config.secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({sucess: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});


// router.post('/book


router.get('/rawfiles', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        Book.find(function (err, books) {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(403).send({sucess: false, 'msg': 'Unauthorized.'});
    }
});


getToken = function( headers ){
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null
    }
};


module.exports = router;