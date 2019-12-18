const { Router } = require('express');
const Temperature = require('../models/Temperature');

module.exports = Router()
  .post('/', (req, res, next) => {
    Temperature
      .create(req.body)
      .then(temp => res.send(temp))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Temperature
      .find()
      .then(temps => res.send(temps))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Temperature
      .findById(req.params.id)
      .then(temp => res.send(temp))
      .catch(next);
  });
