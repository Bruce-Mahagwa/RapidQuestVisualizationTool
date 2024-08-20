// dependencies
import { createSlice } from '@reduxjs/toolkit';
// functions
import { getSales } from '../Actions/salesActions';
// state
const initialState = {
    total_sales: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: ""
    }
}

// slice
const salesSlice = createSlice({
    name: "Space Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSales.fulfilled, (state, action) => {
            const {data, period} = action.payload;
            if (period === "daily") {
                state.total_sales.daily = data;
            }
            else if (period === "monthly") {
                state.total_sales.monthly = data;
            }
            else if (period === "quarterly") {
                state.total_sales.quarterly = data;
            }
            else if (period === 'yearly') {
                state.total_sales.yearly = data;
            }
        }).addCase(getSales.rejected, (state, action) => {
            state.total_sales.error = action.payload
        })
    }
})

export default salesSlice.reducer;