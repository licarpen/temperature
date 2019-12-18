const { Router } = require('express');
const Temperature = require('../models/Temperature');

module.exports = Router()
  .post('/', (req, res, next) => {
    Temperature
      .create(req.body)
      .then(temp => res.send(temp))
      .catch(next);
  });
