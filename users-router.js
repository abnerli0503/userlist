'use strict';
const express    = require('express');        
const routerUsers = express.Router();     

const Users     = require('./users-module');

routerUsers.get('/', (req, res) => {
    res.json({ message: 'welcome to userlist api!' });   
});

routerUsers.post('/userlist', (req, res) => {
    var uu = new Users();  
    uu.id = req.body.id;   
    uu.firstname = req.body.firstname;  
    uu.lastname = req.body.lastname;
    uu.sex = req.body.sex;
    uu.age = req.body.age;
    uu.pwd = req.body.pwd;
    uu.save(  err => {
        if (err) {
            res.send(err);
        };
        console.log(res._id);
        res.json(uu);
    });
        
});

routerUsers.get('/userlist', (req, res) => {
    Users.find((err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

routerUsers.get('/userlist/:users_id', (req, res) => {
    Users.findById(req.params.users_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

routerUsers.put('/userlist/:users_id', (req, res) => {
    Users.findById(req.params.users_id, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log("put")
        console.log(req.body)
        user.id = req.body.id;
        user.firstname = req.body.firstname;  
        user.lastname = req.body.lastname;
        user.sex = req.body.sex;
        user.age = req.body.age;
        user.pwd = req.body.pwd;
        user.save(err =>  {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User updated!' });
        });

    });
});

routerUsers.delete('/userlist/:id', (req, res) => {
    console.log(req.params.id);
    Users.remove({ 
        _id: req.params.id
    }, (err, user) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = routerUsers;


