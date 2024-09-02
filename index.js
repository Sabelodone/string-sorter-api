const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for authentication
const authenticate = (req, res, next) => {
  const apiKey = req.headers['authorization'];

  // Replace 'YOUR_API_KEY' with your actual API key
  if (apiKey && apiKey === 'Bearer YOUR_API_KEY') {
    next(); // Authentication successful, proceed to the next middleware/route handler
  } else {
    res.status(401).json({ error: 'Unauthorized' }); // Authentication failed
  }
};

// Root endpoint to verify the API is running
app.get('/', (req, res) => {
  res.send('API is running. Use POST /sort-string to interact with the API.');
});

// Define the POST route for /sort-string
app.post('/sort-string', authenticate, (req, res) => {
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
  
  // Set the correct Content-Type and return the sorted array as JSON
  res.setHeader('Content-Type', 'application/json');
  res.json({ word: sortedArray });
});

// Middleware to handle unmatched routes (404)
app.use((req, res) => {
  res.status(404)
    .type('text/html')
    .send('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot GET ' + req.originalUrl + '</pre></body></html>');
});

// Start the server (use the port provided by Vercel or default to 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

