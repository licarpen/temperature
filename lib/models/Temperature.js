const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  landAvgTemp: Number,
  landAvgTempUncertainty: Number,
  landMinTemp: Number,
  landMinTempUncertainty: Number,
  landMaxTemp: Number,
  landMaxTempUncertainty: Number,
  landAndOceanAvgTemp: Number,
  landAndOceanAvgTempUncertainty: Number
});

/* [
  {
    '$group': {
      '_id': {
        '$dateToString': {
          'date': '$date', 
          'format': '%Y'
        }
      }, 
      'avgTemp': {
        '$avg': '$landAvgTemp'
      }, 
      'avgMinTemp': {
        '$avg': '$landMinTemp'
      }, 
      'avgMaxTemp': {
        '$avg': '$landMaxTemp'
      }
    }
  }, {
    '$sort': {
      'avgTemp': -1
    }
  }
]*/

module.exports = mongoose.model('Temperature', schema);
