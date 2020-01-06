const Temperature = require('./Temperature');

describe('Temperature model', () => {
  it('has required date', () => {
    const temperature = new Temperature();
    const { errors } = temperature.validateSync();
    expect(errors.date.message).toEqual('Path `date` is required.');
  });
});
