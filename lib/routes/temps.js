const { Router } = require('express');
const Temperature = require('../models/Temperature');

module.exports = Router()
  .post('/', (req, res, next) => {
    Temperature
      .create(req.body)
      .then(temp => res.send(temp))
      .catch(next);
  })  
  .get('/high', (req, res, next) => {
    const { count = 50 } = req.query;
    Temperature
      .getHighLandAvgTempYears(Number(count))
      .then(highTempYears => res.send(highTempYears))
      .catch(next);
  })
  .get('/low', (req, res, next) => {
    const { count = 50 } = req.query;
    Temperature
      .getLowLandAvgTempYears(Number(count))
      .then(lowTempYears => res.send(lowTempYears))
      .catch(next);
  })
  .get('/uncertainty', (req, res, next) => {
    Temperature
      .getLowUncertaintyYears()
      .then(lowUncertainty => res.send(lowUncertainty))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Temperature
      .findById(req.params.id)
      .then(temp => res.send(temp))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Temperature
      .find()
      .then(temps => res.send(temps))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Temperature
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(temp => res.send(temp))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Temperature
      .findByIdAndDelete(req.params.id)
      .then(temp => res.send(temp))
      .catch(next);
  });
