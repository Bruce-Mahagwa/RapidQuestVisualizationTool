// dependencies
import axios from "axios";
// functions
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSales = createAsyncThunk(
    "/sales/getSales",
    async ({daily, monthly, quarterly, yearly}, {rejectWithValue}) => {
        try {
            if (daily) {
                const {data, period} = await axios.get(`/sales/sales_over_time?daily=true`);
                return {data, period}
            }
            else if (monthly) {
                const {data, period} = await axios.get(`/sales/sales_over_time?monthly=true`)
                return {data, period}
            }
            else if (quarterly) {
                const {data, period} = await axios.get(`/sales/sales_over_time?quarterly=true`)
                return {data, period}
            }
            else if (yearly) {
                const {data, period} = await axios.get(`/sales/sales_over_time?yearly=true`)
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

