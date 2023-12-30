
const {connectToMongoDB}=require('./mongo');

const retrive=async(filterParams)=>{
    try
    {
        const { database, collection } = await connectToMongoDB();
      // Retrieve all documents from the collection
    const documents = await collection.find(filterParams).toArray();
    return documents;
    }
    catch(error)
    {
        console.error('Error retrieving data:', error);
        throw error;
    }

}
module.exports={retrive};


