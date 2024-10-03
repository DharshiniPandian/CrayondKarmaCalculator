import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Semichart = () => {


  const totalEmission = useSelector((state) => state.carbonValue.total_emission.total_emission);

  const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);
  const totalFoodEmission = useSelector((state) => state.carbonValue.food.total_food_emission);
  const totalAppliancesEmission = useSelector((state) => state.carbonValue.appliances.total_appliances_emission);
  const totalElectricityEmission = useSelector((state) => state.carbonValue.electricity.total_electricity_emission);

  const data = {
    labels: ['Commute', 'Food', 'Appliances'], 
    datasets: [
      {
        data: [
          totalVehicleEmission,
          totalFoodEmission,
          totalAppliancesEmission+totalElectricityEmission,     
        ],  
        backgroundColor: ['#f58e27', '#f4646e', '#4ac596'], 
        borderWidth: 0, 
        hoverOffset: 4, 
        cutout: '88%',
        rotation: 276, 
        circumference: 170, 
        borderRadius: 8,
        spacing: -20
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
      },  
    },
    layout: {
      padding: {
        bottom: 0, 
      },
    },
    elements: {
      arc: { borderWidth: 0 },
    },
    // scales: {
    //   x: {
    //     beginAtZero: true,
    //   },
    // },
    
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent:'center'}}>
      <div style={{marginTop:'0px', height:'120px',width:'200px'}}>
      <Doughnut data={data} options={options}/></div>
      {/* Center Text */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, 110%)',
          fontSize: '14px',
          fontWeight: "600",
          font: 'normal normal bold 16px/23px Excon',
        }}
      >
        {totalEmission.toFixed(2)}  ton cO2 {/* Hardcoded center text */}
      </div>
    </div>
  );
};

export default Semichart;
