// dependencies
import { createSlice } from '@reduxjs/toolkit';
// functions
import { getSales } from '../Actions/salesActions';
// state
const initialState = {
    total_sales: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: "", period: "", loading: false
    }
}

// slice
const salesSlice = createSlice({
    name: "Space Slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSales.fulfilled, (state, action) => {
            const {data, period} = action.payload.data
            if (period === "daily") {
                state.total_sales.daily = data;
                state.total_sales.period = period;
                state.total_sales.loading = false;
                console.log(state, "state")
            }
            else if (period === "monthly") {
                state.total_sales.monthly = data;
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
            else if (period === "quarterly") {
                state.total_sales.quarterly = data;
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
            else if (period === 'yearly') {
                state.total_sales.yearly = data;
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
        }).addCase(getSales.rejected, (state, action) => {
            state.total_sales.error = action.payload;
            state.total_sales.loading = false;
        }).addCase(getSales.pending, (state, action) => {
            state.total_sales.loading = true;
        })
    }
})

export default salesSlice.reducer;