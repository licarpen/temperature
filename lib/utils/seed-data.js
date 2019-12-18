const csv = require('csvtojson');
const Temperature = require('../models/Temperature');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../../csv/GlobalLandTemperatures_GlobalTemperatures.csv')
    .then(temps => {
      return temps.map(temp => ({
        date: temp.dt,
        landAvgTemp: temp.LandAverageTemperature,
        landAvgTempUncertainty: temp.LandAverageTemperatureUncertainty,
        landMinTemp: temp.LandMinTemperature,
        landMinTempUncertainty: temp.LandMinTemperatureUncertainty,
        landMaxTemp: temp.LandMaxTemperature,
        landMaxTempUncertainty: temp.LandMaxTemperatureUncertainty,
        landAndOceanAvgTemp: temp.LandAndOceanAverageTemperature,
        landAndOceanAvgTempUncertainty: temp.LandAndOceanAverageTemperatureUncertainty 
      }));
    })
    .then(temps => Temperature.create(temps));
}

module.exports = seedData;

