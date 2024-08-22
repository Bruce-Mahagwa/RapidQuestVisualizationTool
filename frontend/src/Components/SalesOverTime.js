// dependencies
import {useSelector, useDispatch} from "react-redux";
import { useState } from "react";
// actions
import { getSales } from "../Redux/Actions/salesActions";

const SalesOverTime = () => {
    // get state from redux store
    const {total_sales} = useSelector(state => state.sales);
    const {daily, monthly, quarterly, yearly, loading, error, period} = total_sales;
    // local state
    const [selectedPeriod, setSelectedPeriod] = useState("none");
    const dispatch = useDispatch();
    
    const fetchData = (e) => {
        try {
            // change styles
            const data_name = e.currentTarget.getAttribute("data-name");
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
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div className = "visualization">
            <div className = "controls">
                <button className = "control_btn" data-name = "daily" onClick={fetchData}>Daily</button>
                <button className = "control_btn" data-name = "monthly" onClick={fetchData}>Monthly</button>
                <button className = "control_btn" data-name = "quarterly" onClick={fetchData}>Quarterly</button>
                <button className = "control_btn" data-name = "yearly" onClick={fetchData}>Yearly</button>
            </div>
            {selectedPeriod === "none" && <div className = "intro">
          <h2>WELCOME TO THE SALES OVER TIME CATEGORY</h2>
          <h4>To select a visualization period please click on the buttons above</h4>
          <p>This category displays information on the evolution of total sales over different
            granularities listed above.
          </p>
            </div>}
            <div className = "graph">

            </div>
        </div>
    )
}
export default SalesOverTime