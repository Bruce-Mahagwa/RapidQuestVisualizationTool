// dependencies
const { MongoClient } = require("mongodb");
// variables
const MONGO_URI = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(MONGO_URI);

const getSalesOverTime = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("RQ_Analytics")
        const collection = database.collection("shopifyOrders");
        const options = {
            sort: {"created_at": 1}, // sorts in ascending order
            projection: {_id: 0, total_price_set: {shop_money: 1}, created_at: 1} // includes only total_price_set and created_at fields
         }
         
         const data = [];

        // daily interval
        const daily = req?.query?.daily
        if (daily) {
            try {
                const total_price_set = await collection.find({}, options).limit(2)
                await total_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "daily"})
            }
            catch(e) {
                console.log(e)
                return res.status(500).json({error: "Could not retrieve data for daily sales"})
            }
        }

        // monthly interval
        const monthly = req?.query?.monthly
        if (monthly) {
            try {
                const monthly_price_set = await collection.aggregate([
                    {
                        $group: {
                            _id: { month: { 
                                $month: {
                                    $toDate: "$created_at"
                                }
                            },
                             year: {
                                 $year: {
                                    $toDate: "$created_at"
                                }
                                }
                            },
                            total_cost_month: { $sum: {$toDouble: "$total_price_set.shop_money.amount"}}
                        },
                    },
                    {$sort:{"_id.year":1, "_id.month":1}}
                ])

                await monthly_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "monthly"})
            }
            catch(e) {
                console.log(e)
                return res.status(500).json({error: "Could not retrieve data for monthly sales"})
            }
        }

        // quarterly interval
        const quarterly = req?.query?.quarterly
        if (quarterly) {
            try {
                const quarterly_price_set = await collection.aggregate([
                    { 
                        $group: {
                            _id: { $dateTrunc: { date: {$toDate: "$created_at"}, unit: "quarter" }},
                            total_cost_quarterly: { $sum: {$toDouble: "$total_price_set.shop_money.amount"} }
                        }
                    },
                    // {$sort:{"_id.date":1}}
                ]).sort({"_id": 1})
                await quarterly_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "quarterly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve data for quarterly sales"})
            }    
        }
        // yearly interval
        const yearly = req?.query?.yearly
        if (yearly) {

        }
    }    
    catch(e) {
        console.log(e, "getSalesOverTime")
    }
}

module.exports = {getSalesOverTime}