const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const cors = require('cors');
const {connectToMongoDB}=require('./mongo');
const Log=require('./models/logmodel');
const {retrive}=require('./retrivedata');
const app=express();
require('dotenv').config({path:path.resolve(__dirname,'./.env')});



// This middleware enables automatic parsing of JSON data in the request body.
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use(express.static('index.html'));
app.use(express.static('script.js'))
// Endpoint for log ingestion
app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/script.js');
});

app.get('/allData',async(req,res)=>{
  try {
    // Extract filter parameters from the query string
    const { timestamp, level, resourceId, traceId, spanId, commit, message } = req.query;

    // Construct the filter object based on provided parameters
    const filterParams = {};

    // Add filter parameters to the object if they exist
    if (timestamp) filterParams.timestamp = new Date(timestamp);
    if (level) filterParams.level = level;
    if (resourceId) filterParams.resourceId = resourceId;
    if (traceId) filterParams.traceId = traceId;
    if (spanId) filterParams.spanId = spanId;
    if (commit) filterParams.commit = commit;
    if (message) filterParams.message = new RegExp(message, 'i'); // Case-insensitive search for the message

    // Retrieve filtered data from the database
    const filteredData = await retrive(filterParams);

    // Send the filtered data as a JSON response
    res.json(filteredData);
  }
  catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/ingest', async (req, res) => {
  const logData = req.body;

  // Validate log data (you can add more validation logic)
  if (!logData || !logData.level || !logData.message) {
    return res.status(400).send('Invalid log data');
  }

  // Create a Log instance from the received data
  const logEntry = new Log(
    logData.level,
    logData.message,
    logData.resourceId,
    logData.timestamp,
    logData.traceId,
    logData.spanId,
    logData.commit,
    logData.metadata
  );
     console.log("tryeing");
  // Perform log ingestion logic (e.g., store in a database)
  // This is where you'll handle the scalability and optimization aspects
  try {
    // Connect to MongoDB
    // const db= await connectToMongoDB();
    // console.log("db send",db);

   


    // new line
    const { collection } = await connectToMongoDB();

    // Store the log entry in the MongoDB collection
    await collection.insertOne(logEntry);
    //  old line
    // await db.collection('test').insertOne(logEntry);
    console.log("line 82 successful");

    res.send('Log ingested and stored in MongoDB successfully');
  } catch (err) {
    console.error('Error:', err);
    res.send('Error storing log in the database');
  }
;
});


const PORT= process.env.PORT

app.listen(PORT,()=>{
  console.log("Listening");

});
