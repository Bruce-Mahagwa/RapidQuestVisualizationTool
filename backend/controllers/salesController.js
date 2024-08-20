// variables
const mongoose = require("mongoose")
// functions
const connectDB = require("../config/db");

const getSalesOverTime = async (req, res) => {
    try {
        const client = await connectDB()
        const db = client.db("RQ_Analytics")
        console.log(db, "rq")
        const colleciton = db.collection("shopifyOrders");
        console.log(collection, "collection")
        const documents = await collection.find({}).count()
        console.log(documents, "documents")
            //     connection.on("connected", async () => {
            // console.log("open")
            // const total_sales_collection =  connection.db.collection("shopifyOrders");
            // const cursor = await total_sales_collection.find({}).limit(3);
            // return res.json({cursor: cursor})
        // })
    }    
    catch(e) {
        console.log(e, "getSalesOverTime")
    }
}

module.exports = {getSalesOverTime}