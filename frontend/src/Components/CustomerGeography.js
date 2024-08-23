// dependencies 
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";

// files
import Loading from "./Loading";

// actions
import { getGeographicalDistribution } from "../Redux/Actions/customerActions";

const CustomerGeography = () => {
    // get state from redux store
    const {get_geography} = useSelector(state => state.customers);
    const {loading, error, value, cities} = get_geography;

    // local state and variables
    const [localError, setLocalError] = useState(false);
    const dispatch = useDispatch();
    
    const fetchData = () => {
        try {
            // fetch data
            const is_data_available = cities.length;
            if (is_data_available === 0) { 
                dispatch(getGeographicalDistribution({}))
            }
            // end of fetch data
        }
        catch(e) {
            console.log(e);
            setLocalError(true)
        }
    }
    
    useEffect(() => {
        fetchData();    
    }, [])

    return (
        <div className = "visualization">
            <div className = "controls">
            </div> <div className = "intro">
                <h2>WELCOME TO THE GEOGRAPHICAL DISTRIBUTION CATEGORY</h2>          
            </div>
            {loading === true && <div className = "loading_container">
                <Loading />
            </div>}
            {error && <div className = "error">
                <h1>`${error}. Please Reload the Page`</h1>        
            </div>}
            {localError && <div className = "error">
                <h1>We have encountered a local error. Please Reload the Page.</h1>
            </div>}

            {!loading && value && <div className = "graph">
                {/* <BarChart width={1200} height={400} data={repeat_purchases[selectedPeriod]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={`repeat_purchases_${selectedPeriod}`} fill="#8884d8" />
                </BarChart> */}
            </div>}
        </div>
    )
}
export default CustomerGeography