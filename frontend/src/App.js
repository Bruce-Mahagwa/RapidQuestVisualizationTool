// dependencies and hooks
import { useEffect } from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
// files
import './App.css';
import RepeatCustomers from './Components/RepeatCustomers';
import SalesOverTime from './Components/SalesOverTime';
import SalesRate from './Components/SalesRate';
import NewCustomers from './Components/NewCustomers';
import CustomerGeography from './Components/CustomerGeography';
import CustomerCohort from './Components/CustomerCohort';

function App() {
  // defaults
  axios.defaults.baseURL = "https://rapid-quest-visualization-tool-backend.vercel.app"

  // search params
  const [graph, setGraph] = useSearchParams();

  // check if there is a search Param in the url in the case of a reload page
  const selectedGraph = graph.get("graph")

  useEffect(() => {
    if (selectedGraph) {
      // adds the class btn_active to a granularity button when a user refreshed the page
      const element = document.querySelector(`[data-name=${selectedGraph}]`);
      element?.classList?.add("btn_active")
    }
  },  [])

  function changeVisualization(e) {
    const data_name = e.currentTarget.getAttribute("data-name");
    setGraph({"graph": data_name});

    // change styles
    e.currentTarget.classList.add("btn_active")
    // remove style from inactive buttons
    const all_btns = document.querySelectorAll(".main_btn");
    all_btns.forEach((item) => {
      if (item.getAttribute("data-name") !== data_name) {
        item.classList.remove("btn_active");
      }
    })
  }
  // end of change tabs
  return (
    <main id = "main">
      <nav>
          <button className = "main_btn" data-name = "sales_over_time" onClick = {changeVisualization}>SalesOverTime</button>
          <button className = "main_btn" data-name = "sales_rate" onClick = {changeVisualization}>SalesGrowthRate</button>
          <button className = "main_btn" data-name = "new_customers" onClick = {changeVisualization}>NewCustomers</button>
          <button className = "main_btn" data-name = "repeat_customers" onClick = {changeVisualization}>RepeatCustomers</button>
          <button className = "main_btn" data-name = "customer_geography" onClick = {changeVisualization}>CustomerGeography</button>
          <button className = "main_btn" data-name = "customer_cohort" onClick = {changeVisualization}>CustomerCohort</button>
      </nav>
      {!selectedGraph && <div className = "intro">
          <h2>WELCOME TO MY VISUALIZATION PAGE</h2>
          <p>To select a visualization category please click on the buttons above</p>
      </div>}
      <div className = "visualization_container">
          {selectedGraph === "sales_over_time" && <SalesOverTime />}
          {selectedGraph === "sales_rate" && <SalesRate />}
          {selectedGraph === "new_customers" && <NewCustomers />}
          {selectedGraph === "repeat_customers" && <RepeatCustomers />}
          {selectedGraph === "customer_geography" && <CustomerGeography />}
          {selectedGraph === "customer_cohort" && <CustomerCohort />}
      </div>
    </main>
  )
}

export default App;
