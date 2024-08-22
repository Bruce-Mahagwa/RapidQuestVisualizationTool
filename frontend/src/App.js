// dependencies
import { useState } from "react";
// files
import './App.css';
import RepeatCustomers from './Components/RepeatCustomers';
import SalesOverTime from './Components/SalesOverTime';
import SalesRate from './Components/SalesRate';
import NewCustomers from './Components/NewCustomers';
import CustomerGeography from './Components/CustomerGeography';
import CustomerCohort from './Components/CustomerCohort';

function App() {
  // change tabs
  const [selectedTab, setSelectedTab] = useState("none");
  function changeVisualization(e) {
    const data_name = e.currentTarget.getAttribute("data-name");
    setSelectedTab(data_name);
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
      {selectedTab === "none" && <div className = "intro">
          <h2>WELCOME TO MY VISUALIZATION PAGE</h2>
          <p>To select a visualization category please click on the buttons above</p>
      </div>}
      <div className = "visualization_container">
          {selectedTab === "sales_over_time" && <SalesOverTime />}
          {selectedTab === "sales_rate" && <SalesRate />}
          {selectedTab === "new_customers" && <NewCustomers />}
          {selectedTab === "repeat_customers" && <RepeatCustomers />}
          {selectedTab === "customer_geography" && <CustomerGeography />}
          {selectedTab === "customer_cohort" && <CustomerCohort />}
      </div>
    </main>
  )
}

export default App;
