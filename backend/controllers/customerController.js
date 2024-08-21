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


const repeatPurchases = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("RQ_Analytics")
        const collection = database.collection("shopifyOrders")
        // get customers with repeated purchases
        const data = [];
        // days
        const daily = req?.query?.daily;
        if (daily) {
            try {
                const daily_repeated_purchases = await collection.aggregate([
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
                                day: {
                                    $dayOfMonth: {
                                        $toDate: "$created_at"
                                    }
                                },
                                id: "$customer.id"
                            },
                            count: { $sum: 1 }
                        },                        
                    },
                    {
                        $match: {
                            "_id.id" :{ $ne : null },
                             count : {$gt: 1}
                        }
                    },
                    {
                        $project: {name: "$_id", count: "$count", _id: 0}
                    },

                    {$sort:{"_id.year":1, "_id.month":1, "_id.day": 1}}
                ])

                await daily_repeated_purchases.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "daily"})
        }
        catch(e) {
            console.log(e);
            return res.status(500).json({error: "Cannot retrieve daily repeated purchases"})
        }
    }

        //monthly
        const monthly = req?.query?.monthly;
        if (monthly) {
            try {
                const monthly_repeated_purchases = await collection.aggregate([
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
                                id: "$customer.id"
                            },
                            count: { $sum: 1 }
                        },                        
                    },
                    {
                        $match: {
                            "_id.id" :{ $ne : null },
                             count : {$gt: 1}
                        }
                    },
                    {
                        $project: {name: "$_id", count: "$count", _id: 0}
                    },

                    {$sort:{"_id.year":1, "_id.month":1}}
                ])

                await monthly_repeated_purchases.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "monthly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Cannot retrieve monthly repeated purchases"})
            }
        } 

        //quarterly
        const quarterly = req?.query?.quarterly;
        if (quarterly) {
            try {
                const quarterly_repeated_purchases = await collection.aggregate([
                    { 
                        $group: {
                            _id: {
                                value: { 
                                    $dateTrunc: { 
                                        date: {
                                            $toDate: "$created_at"
                                        }, 
                                        unit: "quarter" 
                                    },
                                },
                                id: "$customer.id",
                            },
                            count: {$sum: 1}
                        }
                    },
                    {
                        $match: {
                            "_id.id" :{ $ne : null },
                             count : {$gt: 1}
                        }
                    },
                    {
                        $project: {name: "$_id", count: "$count", _id: 0}
                    }
                ]).sort({"name.value": 1})

                await quarterly_repeated_purchases.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "quarterly"})   
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Cannot retrieve quarterly repeated purchases"})
            }
        }

        //yearly
        const yearly = req?.query?.yearly;
        if (yearly) {
            try {
                const yearly_repeated_purchases = await collection.aggregate([
                    {
                        $group: {
                            _id: {                                 
                                year: {
                                    $year: {
                                        $toDate: "$created_at"
                                    }
                                },
                                id: "$customer.id"
                            },
                            count: { $sum: 1 }
                        },                        
                    },
                    {
                        $match: {
                            "_id.id" :{ $ne : null },
                             count : {$gt: 1}
                        }
                    },
                    {
                        $project: {name: "$_id", count: "$count", _id: 0}
                    },

                    {$sort:{"_id.year":1}}
                ])

                await yearly_repeated_purchases.forEach((item) => {
                    data.push(item);
                })
                return res.status(200).json({data, period: "yearly"})
            }
            catch(e) {
                console.log(e);
                return res.status(500).json({error: "Cannot retrieve yearly repeated purchases"})
            }
        }
        return data;
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "Cannot retrieve customers with repeat purchases now"})
    }
}

const getGeographicalDistribution = async (req, res) => {
    try {
        await client.connect();
        const database = client.db("RQ_Analytics")
        const collection = database.collection("shopifyOrders")
        // get cities of customers
        const data = [];
        const options = {
            projection: {"customer.default_address.city": 1, _id: 0} 
        }
        try {
            const cities = await collection.find({}, options)
            await cities.forEach((item) => {
                data.push(item.customer.default_address.city);
            })
            return res.status(200).json({data, value:"cities"});
        }
        catch(e) {
            console.log(e);
            return res.status(500).json({error: "Cannot find customer city"})
        }
        
    }
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "Cannot find geographical distribution of customers"})
    }
}

const cohortValue = async (req, res) => {
    try {

    }
    catch(e) {
        console.log(e);
        return res.status(500).json({error: "Cannot group customers by cohort"})
    }
}
module.exports = {getNewCustomers, repeatPurchases, getGeographicalDistribution, cohortValue}
 