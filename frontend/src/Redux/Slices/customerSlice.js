 // dependencies
import { createSlice, isRejected } from '@reduxjs/toolkit';
// functions
import { getGeographicalDistribution } from '../Actions/customerActions';
import { getCohortValue } from '../Actions/customerActions';
import { repeatPurchases } from '../Actions/customerActions';
import { getNewCustomers } from '../Actions/customerActions';
import { act } from 'react';

// state
const initialState = {
    new_customers: {
        daily: [], weekly: [], monthly: [], error: "", period: "", loading: false
    },
    repeat_purchases: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: "", period: "", loading: false
    },
    get_geography: {
        cities: [], value: "", error: "", loading: false
    },
    get_cohort: {
        cohorts: [], error: "", loading: false, value: ""
    }
}

const customerSlice = createSlice({
    name: "Customer Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getNewCustomers.fulfilled, (state, action) => {
            const {data, period} = action.payload.data
            if (period === "daily") {
                data.map((item) => {
                    const obj = {
                        total_registration_daily: item.total_registration_daily,
                        date: `${item._id.year}-${item._id.month}-${item._id.day}`
                    }
                    state.new_customers.daily.push(obj)
                })
                state.new_customers.period = period;
                state.new_customers.loading = false;
            }
            else if (period === "monthly") {
                data.map((item) => {
                    const obj = {
                        total_registration_monthly: item.total_registration_monthly,
                        date: `${item._id.year}-${item._id.month}`
                    }
                    state.new_customers.monthly.push(obj)
                })
                state.new_customers.period = period;
                state.new_customers.loading = false;
            }
            else if (period === "weekly") {
                data.map((item) => {
                    const obj = {
                        total_registration_weekly: item.total_registration_weekly,
                        date: `${item._id.year}-${item._id.month}-${item._id.week}`
                    }
                    state.new_customers.weekly.push(obj)
                })
                state.new_customers.period = period;
                state.new_customers.loading = false;
            }
        }).addCase(getNewCustomers.rejected, (state, action) => {
            state.new_customers.error = action.payload;
            state.new_customers.loading = false;
        }).addCase(getNewCustomers.pending, (state) => {
            state.new_customers.loading = true;
        }).addCase(repeatPurchases.fulfilled,  (state, action) => {
            const {data, period} = action.payload.data
            if (period === "daily") {
                data.map((item) => {
                    const obj = {
                        repeat_purchases_daily: item.count,
                        date: `${item.name.year}-${item.name.month}-${item.name.day}`
                    }
                    state.repeat_purchases.daily.push(obj)
                })
                state.repeat_purchases.period = period;
                state.repeat_purchases.loading = false;
            }
            else if (period === "monthly") {
                data.map((item) => {
                    const obj = {
                        repeat_purchases_monthly: item.count,
                        date: `${item.name.year}-${item.name.month}`
                    }
                    state.repeat_purchases.monthly.push(obj)
                })
                state.repeat_purchases.period = period;
                state.repeat_purchases.loading = false;
            }
            else if (period === "quarterly") {
                data.map((item) => {
                    const date = new Date(item.name);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const obj = {
                        repeat_purchases_quarterly: item.count,
                        date: `${year}-${month}`
                    }
                    state.repeat_purchases.quarterly.push(obj)
                })
                state.repeat_purchases.period = period;
                state.repeat_purchases.loading = false;
            }
            else if (period === 'yearly') {
                data.map((item) => {
                    const obj = {
                        repeat_purchases_yearly: item.count,
                        date: `${item.name.year}`
                    }
                    state.repeat_purchases.yearly.push(obj)
                })
                state.repeat_purchases.period = period;
                state.repeat_purchases.loading = false;
            }
        }).addCase(repeatPurchases.rejected, (state, action) => {
            state.repeat_purchases.error = action.payload;
            state.repeat_purchases.loading = false;
        }).addCase(repeatPurchases.pending, (state) => {
            state.repeat_purchases.loading = true;
        }).addCase(getGeographicalDistribution.fulfilled, (state, action) => {
            const {data, value} = action.payload.data
            state.get_geography.cities = data;
            state.get_geography.value = value;
        }).addCase(getGeographicalDistribution.rejected, (state, action) => {
            state.get_geography.loading = false;
            state.get_geography.error = action.payload
        }).addCase(getGeographicalDistribution.pending, (state) => {
            state.get_geography.loading = true            
        }).addCase(getCohortValue.fulfilled, (state, action) => {
            const {data, value} = action.payload
            state.get_cohort.cohorts = data;
            state.get_cohort.loading = false;
            state.get_cohort.value = value;
        }).addCase(getCohortValue.rejected, (state, action) => {
            state.get_cohort.loading = false;
            state.get_cohort.error = action.payload;
        }).addCase(getCohortValue.pending, (state) => {
            state.get_cohort.loading = true;
        })
    }
})

export default customerSlice.reducer;