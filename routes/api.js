const express = require('express');
const router = express.Router();
const Emission = require('../models/Emission');

router.use(express.json());

// GET all emissions
router.get('/emissions', async (req, res) => {
  try {
    const emissions = await Emission.find();
    res.json(emissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new emission
router.post('/emissions', async (req, res) => {
  const emission = new Emission({
    source: req.body.source,
    amount: req.body.amount,
    date: req.body.date,
  });

  try {
    const newEmission = await emission.save();
    res.status(201).json(newEmission);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// PUT (or PATCH) to edit an emission by ID
router.put('/emissions/:id', async (req, res) => {
  try {
    const updatedEmission = await Emission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // To return the updated document
    );

    if (!updatedEmission) {
      return res.status(404).json({ message: 'Emission not found' });
    }

    // Log the updated emission to console
    console.log('Updated Emission:', updatedEmission);

    res.json(updatedEmission);
  } catch (err) {
    // Log any errors to console
    console.error('Error updating emission:', err.message);
    res.status(500).json({ message: err.message });
  }
});


// DELETE an emission by ID
router.delete('/emissions/:id', async (req, res) => {
  try {
    const deletedEmission = await Emission.findByIdAndDelete(req.params.id);
    if (!deletedEmission) {
      return res.status(404).json({ message: 'Emission not found' });
    }
    res.json({ message: 'Emission deleted successfully', deletedEmission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route handler for /api
router.get('/', (req, res) => {
  res.send('This is the Carbon Accounting API.');
});

module.exports = router;
