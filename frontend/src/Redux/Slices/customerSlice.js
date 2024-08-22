 // dependencies
import { createSlice } from '@reduxjs/toolkit';
// functions
import { getGeographicalDistribution } from '../Actions/customerActions';
import { getCohortValue } from '../Actions/customerActions';
import { repeatPurchases } from '../Actions/customerActions';
import { getNewCustomers } from '../Actions/customerActions';

// state
const initialState = {
    new_customers: {
        daily: [], weekly: [], monthly: [], error: "", period: "", loading: false
    },
    repeat_purchases: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: "", period: "", loading: false
    },
    get_geographicy: {
        cities: [], value: "", error: "", loading: false
    },
    get_cohort: {
        cohorts: [], error: "", loading: false
    }
}

const customerSlice = createSlice({
    name: "Customer Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

export default customerSlice.reducer;