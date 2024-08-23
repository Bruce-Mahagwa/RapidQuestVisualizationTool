// dependencies 
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import CohortGraph from "react-cohort-graph";
// files
import Loading from "./Loading";

// actions
import { getCohortValue} from "../Redux/Actions/customerActions";

const CustomerCohort = () => {
    // get state from redux store
    const {get_cohort} = useSelector(state => state.customers);
    const {loading, error, cohorts, value} = get_cohort;

    // local state and variables
    const [localError, setLocalError] = useState(false);
    const dispatch = useDispatch();
    
    const fetchData = () => {
        try {
            // fetch data
            const is_data_available = cohorts.length;
            if (is_data_available === 0) { 
                dispatch(getCohortValue({}))
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
                <h2>WELCOME TO THE COHORT DISTRIBUTION CATEGORY</h2>          
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
                <CohortGraph 
                    data = {{
                        ids: cohorts
                    }}
                />
            </div>}
        </div>
    )
}
export default CustomerCohort