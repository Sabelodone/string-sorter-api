const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Root endpoint to verify the API is running
app.get('/', (req, res) => {
  res.send('API is running. Use POST /sort-string to interact with the API.');
});

// Define the POST route for /sort-string
app.post('/sort-string', (req, res) => {
  const data = req.body.data;
  
  if (typeof data !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  
  const sortedArray = data.split('').sort();
  res.json({ word: sortedArray });
});

// Middleware to handle unmatched routes (404)
app.use((req, res) => {
  res.status(404)
    .type('application/json') // Set content type to JSON
    .send({ error: 'Not Found' }); // Send a JSON object with error message
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});