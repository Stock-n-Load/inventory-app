// const app = require("./server/app");
// const sequelize = require("./server/db");

// const PORT = process.env.PORT || 3000;

// async function init() {
//   try {
//     await sequelize.sync();

//     app.listen(PORT, () => {
//       console.log(`Server listening at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Error starting server:", error);
//   }
// }

// init();
// Load environment variables from .env file (for local development)
require('dotenv').config(); // Load environment variables from .env file (for local dev)

const express = require('express');
const AWS = require('aws-sdk');
const sequelize = require('./server/db'); // Assuming sequelize is still needed for DB management
const app = express();

const PORT = process.env.PORT || 3000;

// Set up AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Get AWS Access Key ID from env variables
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Get AWS Secret Access Key from env variables
  region: process.env.AWS_REGION, // Region where your S3 bucket is located
});

// Function to fetch data from S3
const getS3Data = () => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // The name of your S3 bucket
    Key: 'items2.json', // The key (filename) of your JSON file in the S3 bucket
  };

  return s3.getObject(params).promise()
    .then(data => {
      return JSON.parse(data.Body.toString('utf-8')); // Convert buffer to string and parse JSON
    })
    .catch(err => {
      throw new Error('Error fetching data from S3: ' + err.message);
    });
};

// API route to fetch data (only uses S3 for data)
app.get('/api/data', async (req, res) => {
  try {
    const data = await getS3Data(); // Fetch data from S3
    res.json(data); // Return the JSON data to the client
  } catch (error) {
    console.error('Error fetching data from S3:', error);
    res.status(500).json({ message: 'Error fetching data from S3' });
  }
});

// Start server and connect to DB (if required)
async function init() {
  try {
    await sequelize.sync(); // If you are still using Sequelize for database, you can keep this
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

init();

