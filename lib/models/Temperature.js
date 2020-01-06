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

schema.statics.getHighLandAvgTempYears = function(n = 50){
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date', 
            'format': '%Y'
          }
        }, 
        'landAvgTemp': {
          '$avg': '$landAvgTemp'
        }
      }
    }, {
      '$sort': {
        'landAvgTemp': -1
      }
    }, {
      '$limit': n
    }
  ]);
};

schema.statics.getLowLandAvgTempYears = function(n = 50){
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date', 
            'format': '%Y'
          }
        }, 
        'landAvgTemp': {
          '$avg': '$landAvgTemp'
        }
      }
    }, {
      '$sort': {
        'landAvgTemp': 1
      }
    }, {
      '$limit': n
    }
  ]);
};

schema.statics.getLowUncertaintyYears = function(){
  return this.aggregate([
    {
      '$group': {
        '_id': {
          '$dateToString': {
            'date': '$date', 
            'format': '%Y'
          }
        }, 
        'uncertainty': {
          '$avg': '$landAvgTempUncertainty'
        }
      }
    }, {
      '$sort': {
        'uncertainty': 1
      }
    }, {
      '$limit': 50
    }
  ]);
};

module.exports = mongoose.model('Temperature', schema);
