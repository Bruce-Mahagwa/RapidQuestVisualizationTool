// dependencies
import axios from "axios"; 
// functions
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getNewCustomers = createAsyncThunk(
    "customers/getNewCustomers",
    async({daily, weekly, monthly}, {rejectWithValue}) => {
        try {
            if (daily) {
                const {data, period} = await axios.get(`/customers/new_customers?daily=true`);
                return {data, period}
            }
            else if (weekly) {
                const {data, period} = await axios.get(`/customers/new_customers?weekly=true`)
                return {data, period}
            }
            else if (monthly) {
                const {data, period} = await axios.get(`/customers/new_customers?monthly=true`)
                return {data, period}
            }
        }
        catch(e) {
            console.log(e)
            if (e.response.data.error) {
                return rejectWithValue(e.response.data.error)
            }
        }
    }
)

export const repeatPurchases = createAsyncThunk(
    "customers/repeat_purchases",
    async ({daily, monthly, quarterly, yearly}, {rejectWithValue}) => {
        try {
            if (daily) {
                const {data, period} = await axios.get(`/customers/repeat_purchases?daily=true`);
                return {data, period}
            }
            else if (monthly) {
                const {data, period} = await axios.get(`/customers/repeat_purchases?monthly=true`)
                return {data, period}
            }
            else if (quarterly) {
                const {data, period} = await axios.get(`/customers/repeat_purchases?quarterly=true`)
                return {data, period}
            }
            else if (yearly) {
                const {data, period} = await axios.get(`/customers/repeat_purchases?yearly=true`)
                return {data, period}
            }
        }
        catch(e) {
            console.log(e)
            if (e.response.data.error) {
                return rejectWithValue(e.response.data.error)
            }
        }
    }
)

export const getGeographicalDistribution = createAsyncThunk(
    "customers/getGeographicalDistribution",
    async ({}, {rejectWithValue}) => {
        try {
            const {data, value} = await axios.get("/customers/geographical_distribution")
            return {data, value};
        }
        catch(e) {
            console.log(e)
            if (e.response.data.error) {
                return rejectWithValue(e.response.data.error)
            }           
        }
    }
)

export const getCohortValue = createAsyncThunk(
    "customers/getCohortValue",
    async ({}, {rejectWithValue}) => {
        try {
            const {data} = await axios.get("/customers/cohortgroup");
            return data;
        }
        catch(e) {
            console.log(e)
            if (e.response.data.error) {
                return rejectWithValue(e.response.data.error)
            }
        }
    }
)