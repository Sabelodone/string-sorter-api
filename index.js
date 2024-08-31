const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the POST route for /sort-string
app.post('/sort-string', (req, res) => {
  // Log the incoming request for debugging
  console.log('Request Body:', req.body);

  // Extract data from the request body
  const data = req.body.data;

  // Check if 'data' is a string
  if (typeof data !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Convert string to array, sort it, and return the result
  const sortedArray = data.split('').sort();
  res.json({ word: sortedArray });
});

// Middleware to handle unmatched routes (404)
app.use((req, res) => {
  res.status(404)
    .type('text/html')
    .send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot GET ' + req.originalUrl + '</pre></body></html>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
