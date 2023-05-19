const express = require('express');
const routes = express.Router();

const jwtChecker = require('../../middlewares/jwt.checker');

routes.use('/project', require('./project.route'));
routes.use('/experience',require('./experience.route'));
routes.use('/user', jwtChecker, require('../routes/user.route'));

module.exports = routes;