// dependencies 
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import {Bar, Area, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from "recharts";

// files
import Loading from "./Loading";

// actions
import { getSalesRate } from "../Redux/Actions/salesActions";


const SalesRate = () => {
    // get state from redux store
    const {sales_rate} = useSelector(state => state.sales);
    const {loading, error, period, monthly} = sales_rate;

    // local state and variables
    const [localError, setLocalError] = useState(false);
    const dispatch = useDispatch();

    const fetchData = (e) => {
        try {
            // fetch data
            const is_data_available = monthly.length;
            if (is_data_available === 0) { 
                dispatch(getSalesRate({}));
            }
            // end of fetch data
        }
        catch(e) {
            console.log(e);
            setLocalError(true)
        }
    }
    

    useEffect(() => {
        fetchData()        
    }, [])

    return (
        <div className = "visualization">
            <div className = "controls">
            </div>
            <div className = "intro">
                <h2>WELCOME TO THE SALES OVER TIME CATEGORY</h2>
            </div>

            {loading === true && <div className = "loading_container">
                <Loading />
            </div>}
            {error && <div className = "error">
                <h1>`${error}. Please reload page`</h1>        
            </div>}
            {localError && <div className = "error">
                <h1>We have encountered a local error. Please reload the Page.</h1>
            </div>}


            {!loading && period && <div className = "graph">
            
                {/* <LineChart width={1200} height={400} data={monthly}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={`total_cost_monthly`} stroke="#8884d8" />
                </LineChart> */}
                <ComposedChart width={1200} height={400} data={monthly}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="total_cost_monthly" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="total_cost_monthly" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey={`total_cost_monthly`} stroke="#8884d8" />
                </ComposedChart>
            </div>}
        </div>
    )
}
export default SalesRate