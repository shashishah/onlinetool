const express = require('express');
const route =express.Router()

const services= require("../services/render");
const controller = require("../controller/controller");

// rout rout for home
route.get('/',services.homeRoutes);

// rout rout for add user
route.get('/add-user',services.add_user);

// rout rout for update user
route.get('/update-user',services.update_user);

//API

route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

 route.post('/api/login', controller.login);

module.exports = route

