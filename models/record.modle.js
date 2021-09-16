const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  voltage: { type: Number },
  current: { type: Number },
  power: { type: Number },
  frequency: { type: Number },
  energy: { type: Number },
  powerFactor: { type: Number },
});

module.exports = mongoose.model('Record', RecordSchema);

