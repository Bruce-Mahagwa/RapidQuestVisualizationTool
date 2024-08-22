// dependencies
import { configureStore } from "@reduxjs/toolkit"
// files      
import SalesReducer from "./Slices/salesSlice"
import CustomerReducer from "./Slices/customerSlice";

// initialState
const INITIAL_STATE = {
  sales: {
    total_sales: {
        daily: [], monthly: [], quarterly: [], yearly: [], error: "", period: "", loading: false
    }
  },
  customers: {
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
}

export default configureStore({
  reducer: {
    sales: SalesReducer,
    customers: CustomerReducer
  },
  preloadedState: INITIAL_STATE,
})