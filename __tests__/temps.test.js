require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Temperature = require('../lib/models/Temperature');

describe('temperatures routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });  
  
  let temperatureData;
  let date;

  beforeEach(async() => {
    date = new Date();
    temperatureData = await Temperature.create({
      date,
      landAvgTemp: 14,
      landAvgTempUncertainty: 2,
      landMinTemp: 3,
      landMinTempUncertainty: 1,
      landMaxTemp: 20,
      landMaxTempUncertainty: 1.3,
      landAndOceanAvgTemp: 12,
      landAndOceanAvgTempUncertainty: 1.1
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can create a new temperature', () => {
    date = new Date();
    return request(app)
      .post('/api/v1/temps')
      .send({
        date,
        landAvgTemp: 14,
        landAvgTempUncertainty: 2,
        landMinTemp: 3,
        landMinTempUncertainty: 1,
        landMaxTemp: 20,
        landMaxTempUncertainty: 1.3,
        landAndOceanAvgTemp: 12,
        landAndOceanAvgTempUncertainty: 1.1
      })
      .then(res => {
        expect(res.body).toEqual({
          date: date.toISOString(),
          landAvgTemp: 14,
          landAvgTempUncertainty: 2,
          landMinTemp: 3,
          landMinTempUncertainty: 1,
          landMaxTemp: 20,
          landMaxTempUncertainty: 1.3,
          landAndOceanAvgTemp: 12,
          landAndOceanAvgTempUncertainty: 1.1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('gets all temperatures', () => {
    return request(app)
      .get('/api/v1/temps')
      .then(res => {
        expect(res.body).toEqual([{
          date: date.toISOString(),
          landAvgTemp: 14,
          landAvgTempUncertainty: 2,
          landMinTemp: 3,
          landMinTempUncertainty: 1,
          landMaxTemp: 20,
          landMaxTempUncertainty: 1.3,
          landAndOceanAvgTemp: 12,
          landAndOceanAvgTempUncertainty: 1.1,
          _id: expect.any(String),
          __v: 0
        }]);
      });
  });
  it('gets a temperature by id', () => {
    return request(app)
      .get(`/api/v1/temps/${temperatureData.id}`)
      .then(res => {
        expect(res.body).toEqual({
          date: date.toISOString(),
          landAvgTemp: 14,
          landAvgTempUncertainty: 2,
          landMinTemp: 3,
          landMinTempUncertainty: 1,
          landMaxTemp: 20,
          landMaxTempUncertainty: 1.3,
          landAndOceanAvgTemp: 12,
          landAndOceanAvgTempUncertainty: 1.1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('updates temperature', () => {
    return request(app)
      .patch(`/api/v1/temps/${temperatureData.id}`)
      .send({ landAvgTemp: 12 })
      .then(res => {
        expect(res.body).toEqual({
          date: date.toISOString(),
          landAvgTemp: 12,
          landAvgTempUncertainty: 2,
          landMinTemp: 3,
          landMinTempUncertainty: 1,
          landMaxTemp: 20,
          landMaxTempUncertainty: 1.3,
          landAndOceanAvgTemp: 12,
          landAndOceanAvgTempUncertainty: 1.1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('deletes temperature', () => {
    return request(app)
      .delete(`/api/v1/temps/${temperatureData.id}`)
      .then(res => {
        expect(res.body).toEqual({
          date: date.toISOString(),
          landAvgTemp: 14,
          landAvgTempUncertainty: 2,
          landMinTemp: 3,
          landMinTempUncertainty: 1,
          landMaxTemp: 20,
          landMaxTempUncertainty: 1.3,
          landAndOceanAvgTemp: 12,
          landAndOceanAvgTempUncertainty: 1.1,
          _id: expect.any(String),
          __v: 0
        });
      });
  });
});
