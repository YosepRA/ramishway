const Delivery = require('./models/Delivery');

const deliveries = require('./fakeData');

module.exports = function () {
  Delivery.deleteMany({})
    .then(() => Delivery.create(deliveries))
    .then(() => console.log('Data seeding is complete.'));
};
