import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Semichart = () => {
  const data = {
    labels: ['Commute', 'Food', 'Appliances'], 
    datasets: [
      {
        data: [30, 40, 30], 
        backgroundColor: ['#f58e27', '#f4646e', '#4ac596'], 
        borderWidth: 0, 
        hoverOffset: 4, 
        cutout: '89%',
        rotation: 270, 
        circumference: 180, 
        borderRadius: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false }, 
      legend: {
        display: false, 
        labels: {
          padding: 10, 
        },
      },  
    },
    layout: {
      padding: {
        bottom: 0, 
      },
    },
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{marginTop:'0px', height:'100px',width:'180px'}}>
      <Doughnut data={data} options={options}/></div>
      {/* Center Text */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 80%)',
          fontSize: '14px',
          fontWeight: "600",
          font: 'normal normal bold 16px/23px Excon',
        }}
      >
        18 ton cO2 {/* Hardcoded center text */}
      </div>
    </div>
  );
};

export default Semichart;
