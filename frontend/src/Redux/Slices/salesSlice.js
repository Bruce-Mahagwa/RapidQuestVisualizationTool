// dependencies
import { createSlice } from '@reduxjs/toolkit';
// functions
import { getSales, getSalesRate } from '../Actions/salesActions';
// state
const initialState = {
    total_sales: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: "", period: "", loading: false
    },
    sales_rate: {
        monthly: [], error: "", period: "", loading: false 
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
                data.forEach((item) => {
                    const obj = {
                        total_cost_daily: item.total_cost_daily,
                        date: `${item._id.year}-${item._id.month}-${item._id.day}`
                    }
                    state.total_sales.daily.push(obj)
                })
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
            else if (period === "monthly") {
                data.forEach((item) => {
                    const obj = {
                        total_cost_monthly: item.total_cost_monthly,
                        date: `${item._id.year}-${item._id.month}`
                    }
                    state.total_sales.monthly.push(obj)
                })
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
            else if (period === "quarterly") {
                data.forEach((item) => {
                    const date = new Date(item._id);
                    const year = date.getFullYear();
                    const month = date.getMonth();
                    const obj = {
                        total_cost_quarterly: item.total_cost_quarterly,
                        date: `${year}-${month}`
                    }
                    state.total_sales.quarterly.push(obj)
                })
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
            else if (period === 'yearly') {
                data.forEach((item) => {
                    const obj = {
                        total_cost_yearly: item.total_cost_yearly,
                        date: `${item._id.year}`
                    }
                    state.total_sales.yearly.push(obj)
                })
                state.total_sales.period = period;
                state.total_sales.loading = false;
            }
        }).addCase(getSales.rejected, (state, action) => {
            state.total_sales.error = action.payload;
            state.total_sales.loading = false;
        }).addCase(getSales.pending, (state, action) => {
            state.total_sales.loading = true;
        }).addCase(getSalesRate.fulfilled, (state, action) => {
            const {data, period} = action.payload.data
            data.forEach((item) => {
                const obj = {
                    total_cost_monthly: item.total_cost_monthly,
                    date: `${item._id.year}-${item._id.month}`
                }
                state.sales_rate.monthly.push(obj)
            })
            state.sales_rate.period = period;
            state.sales_rate.loading = false;
        }).addCase(getSalesRate.rejected, (state, action) => {
            state.sales_rate.loading = false;
            state.sales_rate.error = action.payload
        }).addCase(getSalesRate.pending, (state, action) => {
            state.sales_rate.loading = true;
        })
    }
})

export default salesSlice.reducer;