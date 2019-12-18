const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  landAvgTemp: {
    type: Number,
    required: true
  },
  landAvgTempUncertainty: Number,
  landMinTemp: Number,
  landMinTempUncertainty: Number,
  landMaxTemp: Number,
  landMaxTempUncertainty: Number,
  landAndOceanAvgTemp: Number,
  landAndOceanAvgTempUncertainty: Number
});

module.exports = mongoose.model('Temperature', schema);
