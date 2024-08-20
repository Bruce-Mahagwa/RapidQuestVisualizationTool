

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI);
    // await mongoose.connect(MONGO_URI);
    await client.connect();
    console.log("connected to mongodb");
    return client;
  } catch (e) {
    console.log("failed to connect to database");
    console.log(e);
    process.exit(1);
  }
};
module.exports = connectDB;