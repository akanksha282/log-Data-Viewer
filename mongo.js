
const mongoose=require('mongoose');
const { MongoClient } = require('mongodb')
require('dotenv').config();

const url = process.env.MONGO_URI;
const dbName = 'logingestor';

const client = new MongoClient(url);

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database=client.db(dbName);
    const collection = database.collection('test');
    console.log(" collection is", collection);
    console.log("name of database",database);
    return { database,collection};
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = { connectToMongoDB };


