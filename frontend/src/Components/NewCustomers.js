// dependencies 
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from "recharts";

// files
import Loading from "./Loading";
// actions
import { getNewCustomers } from "../Redux/Actions/customerActions";

const NewCustomers = () => {
    // get state from redux store
    const {new_customers} = useSelector(state => state.customers);
    const {loading, error, period} = new_customers;
    // local state and variables
    const [selectedPeriod, setSelectedPeriod] = useState("none");
    const [localError, setLocalError] = useState(false);
    const dispatch = useDispatch();
    
    // search params
    const [granularity, setGranularity] = useSearchParams();


    function add_class(data_name) {
        // adds the class btn_active to a granularity button when a user refreshed the page
        const element = document.querySelector(`[data-name=${data_name}]`);
        element?.classList?.add("btn_active")
    }

    useEffect(() => {
        // runs incase the user refreshes the page
        const daily = granularity.get("daily")
        const weekly = granularity.get("weekly")
        const monthly = granularity.get("monthly")

        if (daily) {
            dispatch(getNewCustomers({daily: "daily"}))
            setSelectedPeriod("daily")
            add_class("daily")
        }
        else if (weekly) {
            dispatch(getNewCustomers({weekly: "weekly"}))
            setSelectedPeriod("weekly")
            add_class("weekly")
        }
        else if (monthly) {
            dispatch(getNewCustomers({monthly: "monthly"}))
            setSelectedPeriod("monthly")
            add_class("monthly")
        }        
    }, [])

    const fetchData = (e) => {
        try {
            // global variables
            const data_name = e.currentTarget.getAttribute("data-name");

            // change styles
            setSelectedPeriod(data_name);
            // change styles
            e.currentTarget.classList.add("btn_active")
            // remove style from inactive buttons
            const all_btns = document.querySelectorAll(".control_btn");
            all_btns.forEach((item) => {
            if (item.getAttribute("data-name") !== data_name) {
                item.classList.remove("btn_active");
            }
            })
            // end of change styles

            // set the search params first
            if (Array.from(granularity).length > 1) {
                let query_obj = {}
                const graph = granularity.get("graph")
                query_obj = {
                    graph: graph,
                    [data_name]: "true"
                }
                setGranularity(query_obj)
            }
            else {
                granularity.set(data_name, "true")
                setGranularity(granularity)
            }
            // end of set search params


            // fetch data
            const is_data_available = new_customers[data_name];
            if (is_data_available?.length === 0) { 
                dispatch(getNewCustomers({[data_name]: data_name}))
            }
            // end of fetch data
        }
        catch(e) {
            console.log(e);
            setLocalError(true)
        }
    }
    return (
        <div className = "visualization">
            <div className = "controls">
                <button className = "control_btn" data-name = "daily" onClick={fetchData}>Daily</button>
                <button className = "control_btn" data-name = "weekly" onClick={fetchData}>Weekly</button>
                <button className = "control_btn" data-name = "monthly" onClick={fetchData}>Monthly</button>
            </div>
             {selectedPeriod === "none" && <div className = "intro">
          <h2>WELCOME TO THE NEW CUSTOMERS OVER TIME CATEGORY</h2>
          <h4>To select a visualization period please click on the buttons above</h4>
          <p>This category displays information on the evolution of new customers over different
            granularities listed above.
          </p>
            </div>}

            {loading === true && <div className = "loading_container">
                <Loading />
            </div>}
            {error && <div className = "error">
                <h1>`${error}. Please reload page`</h1>    
            </div>}
            {localError && <div className = "error">
                <h1>We have encountered a local error. Please reload the Page.</h1>
            </div>}


            {!loading && period && selectedPeriod !== "none" && <div className = "graph">
            
            <LineChart width={1200} height={400} data={new_customers[selectedPeriod]}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={`total_registration_${selectedPeriod}`} stroke="#8884d8" />
            </LineChart>
            </div>}

        </div>
    )
}
export default NewCustomers