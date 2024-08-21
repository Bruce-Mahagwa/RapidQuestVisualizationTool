// dependencies
const { MongoClient } = require("mongodb");
// variables
const MONGO_URI = "mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(MONGO_URI);

const getNewCustomers = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("RQ_Analytics")
        const collection = database.collection("shopifyCustomers");
        // get count of customer registration dates for days, week and month
        const data = [];

        // days
        const daily = req?.query?.daily;
        if (daily) {
            try {
                const daily_registration = await collection.aggregate([
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
                            total_registration_daily: { $sum: 1}
                        },
                    },
                    {$sort:{"_id.year":1, "_id.month":1, "_id.day": 1}}
                ])

                await daily_registration.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "daily"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve daily customer registration data"})
            }
        }

        // weekly
        const weekly = req?.query?.weekly;
        if (weekly) {
            try {
                const weekly_registration = await collection.aggregate([
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
                                },
                                week: {
                                    $week: {
                                        $toDate: "$created_at"
                                    }
                                }
                            },
                            total_registration_weekly: { $sum: 1}
                        },
                    },
                    {$sort:{"_id.year":1, "_id.month":1, "_id.week": 1}}
                ])

                await weekly_registration.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "weekly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve weekly customer registration data"})
            }
        }

        // months
        const monthly = req?.query?.monthly;
        if (monthly) {
            try {
                const monthly_registration = await collection.aggregate([
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
                            total_monthly_registration: { $sum: 1}
                        },
                    },
                    {$sort:{"_id.year":1, "_id.month":1}}
                ])

                await monthly_registration.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "monthly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Could not retrieve monthly customer registration data"})
            }
        }

        return data;
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "Cannot get new customer data now."})
    }
}

module.exports = {getNewCustomers}