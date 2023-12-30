// generateDummyData.js

const { connectToMongoDB } = require('./mongo');
const { faker } = require('@faker-js/faker');
const Log = require('./models/logmodel');

async function generateAndSaveDataset(numEntries) {
  let { database, collection } = await connectToMongoDB();
  try {
    // Generate and save dummy data
    for (let i = 0; i < numEntries; i++) {
      const randomLog = {
        level: faker.helpers.arrayElement(['info', 'error', 'warning']),
        message: faker.lorem.sentence(1),
        resourceId: faker.internet.domainWord(),
        timestamp: faker.date.recent(),
        traceId: faker.string.uuid(),
        spanId: faker.string.uuid(),
        commit: faker.git.commitSha(),
        metadata: {
          someField: faker.string.alphanumeric(),
          anotherField: faker.string.numeric(1),
        },
      };

      // Save the generated log to MongoDB
      await collection.insertOne(randomLog);
      console.log(`Log entry ${i + 1} saved successfully. Data:`, randomLog);
    }

    console.log('Data generation completed.');
  } catch (error) {
    console.error('Error generating and saving data:', error.message);
  } 
}

// Call the function to generate and save data
generateAndSaveDataset(50);
