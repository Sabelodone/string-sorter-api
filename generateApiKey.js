const crypto = require('crypto');
const apiKey = crypto.randomBytes(20).toString('hex');
console.log(apiKey);
