'use strict'

const express = require('express');
const cors = require('cors');

//init db
require('./settings/db.settings');

const app = express();

app.use(cors());
app.use(express.json());

app.use('', require('./api/routes'));
app.use('/auth', require('./auth/routes'));

app.use('/', (req, res) => {
  res.status('404').json({ message: 'Not found' });
})

module.exports = app