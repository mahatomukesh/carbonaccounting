const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mukeshmahatodhanuk267:D1aTQ7FKlGId59iv@cluster0.bo9ayjv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api', apiRoutes);

// Define a route handler for the root ("/")
app.get('/', (req, res) => {
  res.send('Welcome to the Carbon Accounting API');
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'client')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
