const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const deliverySchema = new mongoose.Schema({
  shipNumber: String,
  owner: String,
  city: String,
  fishType: String,
  weight: Number,
});

deliverySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Delivery', deliverySchema);
