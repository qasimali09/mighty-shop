import React from 'react';
import { BsEye } from "react-icons/bs";
import AreaChart from '../../components/charts/areaChart';
 
const Dashboard = () => {
  return (
    <div className='container'>
      <div className="dashboard-stats">
        <div className="stat-box">
          <BsEye className='icon' />
          <div className="info">
            <h4>unique visitors</h4>
            <h2>230</h2>
          </div>
        </div>
        <div className="stat-box">
          <BsEye className='icon' />
          <div className="info">
            <h4>total Orders</h4>
            <h2>39</h2>
          </div>
        </div>
        <div className="stat-box">
          <BsEye className='icon' />
          <div className="info">
            <h4>total earning</h4>
            <h2>2300$</h2>
          </div>
        </div>
        <div className="stat-box">
          <BsEye className='icon' />
          <div className="info">
            <h4>total customers</h4>
            <h2>23</h2>
          </div>
        </div>
      </div>

      <div className="charts-wrapper">
        <div className="chart-box"><AreaChart /></div>
      </div>
    </div>
  )
}

export default Dashboard;