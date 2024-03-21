const mongoose = require('mongoose');

const EmissionSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: Date,
  // Add more fields as needed
});

module.exports = mongoose.model('Emission', EmissionSchema);
