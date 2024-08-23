// dependencies
const { MongoClient } = require("mongodb");
// variables
const MONGO_URI = process.env.MONGO_URI;
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
                const daily_price_set = await collection.aggregate([
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
                             },
                             day: {
                                $dayOfMonth: {
                                    $toDate: "$created_at"
                                }
                             }
                            },
                            total_cost_daily: { $sum: {$toDouble: "$total_price_set.shop_money.amount"}}
                        },
                    },
                    {$sort:{"_id.year":1, "_id.month":1, "_id.day": 1}}
                ]).limit(500);
// 
                await daily_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "daily"})
            }
            catch(e) {
                console.log(e)
                return res.status(500).json({error: "Could not retrieve data for daily sales. Vercel sometimes has data fetching issues. Please reload the page"})
            }
        }

        // monthly interval
        const monthly = req?.query?.monthly
        if (monthly) {
            try {
                const monthly_price_set = await collection.aggregate([
                    {
                        $group: {
                            _id: { 
                                month: { 
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
                                total_cost_monthly: { $sum: {$toDouble: "$total_price_set.shop_money.amount"}},
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
                return res.status(500).json({error: "Could not retrieve data for monthly sales. Vercel sometimes has data fetching issues. Please reload the page"})
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
                ]).sort({"_id": 1})
                await quarterly_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "quarterly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve data for quarterly sales. Vercel sometimes has data fetching issues. Please reload the page"})
            }    
        }
        // yearly interval
        const yearly = req?.query?.yearly
        if (yearly) {
            try {
                const yearly_price_set = await collection.aggregate([
                    {
                        $group: {
                            _id: {
                             year: {
                                 $year: {
                                    $toDate: "$created_at"
                                }
                            }
                        },
                        total_cost_yearly: { $sum: {$toDouble: "$total_price_set.shop_money.amount"}}
                        },
                    },
                    {$sort:{"_id.year":1}}
                ])
                await yearly_price_set.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "yearly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve data for yearly sales. Vercel sometimes has data fetching issues. Please reload the page"})
            }
        }
        return res.status(200).json({data, period: "NO PERIOD SPECIFIED"})
    }    
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "We have encountered an internal error. Please reload the page."})
    }
}
const salesRate = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("RQ_Analytics")
        const collection = database.collection("shopifyOrders");

        const data = [];

    // monthly interval
        try {
            const monthly_price_set = await collection.aggregate([
                {
                    $group: {
                        _id: { 
                            month: { 
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
                            total_cost_monthly: { $sum: {$toDouble: "$total_price_set.shop_money.amount"}},
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
            return res.status(500).json({error: "Could not retrieve data for monthly sales growth rate. Vercel sometimes has data fetching issues. Please reload the page"})
        }
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "Cannot calculate sales growth rate. Vercel sometimes has data fetching issues. Please reload the page."})
    }
}
module.exports = {getSalesOverTime, salesRate}