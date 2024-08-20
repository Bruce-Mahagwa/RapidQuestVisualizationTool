// dependencies
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
// variables
const MONGO_URI = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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