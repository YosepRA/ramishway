const faker = require('faker');
const { randomUppercase, randomNum } = require('./helpers');

faker.seed(100);

// Data structure.
// {
//   shipNumber: 'AK-24560-XZ',
//   owner: 'Jack Carlo',
//   city: 'South Dakota',
//   fishType: 'Tuna',
//   weight: 100,
// }

let fishTypes = ['Tuna', 'Snappers', 'Cod', 'Anchovy', 'Swordfish'];

let deliveries = [];
let deliveriesAmount = 103;

for (let i = 0; i < deliveriesAmount; i++) {
  deliveries.push({
    shipNumber: generateShipNumber(),
    owner: `${faker.name.lastName()}, ${faker.name.firstName()}`,
    city: faker.address.state(false),
    fishType: faker.helpers.randomize(fishTypes),
    weight: faker.random.number(1000),
  });
}

function generateShipNumber() {
  return `${randomUppercase(2)}-${randomNum(1000, 9999)}-${randomUppercase(3)}`;
}

module.exports = deliveries;
