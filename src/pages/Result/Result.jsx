import React from 'react';
import Backimg from '../../assets/background.svg';
import Tree from '../../assets/Deciduous Tree.png';
import graph from '../../assets/graph.png';
import './Result.css';
import Semi from "../Result/chart";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Result = () => {
    const navigate = useNavigate();

    const handlePlant = () => {
        navigate('/tree-form');
    }

    const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);
    const saplings = (totalVehicleEmission / 200).toFixed();

    const vehicleId = useSelector((state) => state.carbonValue.vehicle.vehicle_id);
    const vehicleCount = useSelector((state) => state.carbonValue.vehicle.vehicle_count);
    const fuelId = useSelector((state) => state.carbonValue.vehicle.fuel_id);
    const travelDistance = useSelector((state) => state.carbonValue.vehicle.travel_distance);
    const foodId = useSelector((state) => state.carbonValue.food.food_id);
    const totalEmission = useSelector((state) => state.carbonValue.total_emission.total_emission);
    const totalElectricityEmission = useSelector((state) => state.carbonValue.electricity.total_electricity_emission);
    const appliances = useSelector((state)=>state.carbonValue.appliances.appliance_id)

    console.log("Vehicle ID:", vehicleId);
    console.log("Vehicle Count:", vehicleCount);
    console.log("Fuel ID:", fuelId);
    console.log("Travel Distance:", travelDistance);
    console.log("Food ID:", foodId);
    console.log("Total Emission:", totalEmission);
    console.log("Total Electricity Emission:", totalElectricityEmission);
    console.log("Appliances",appliances);
    const handleRemindLater = async () => {
        const postData = {
            vehicle: {
                vehicle_id: vehicleId,
                vehicle_count: vehicleCount,
                fuel_type: fuelId,
                travel_distance: travelDistance,
            },
            food: {
                food_type: foodId
            },
            appliance: {
                electricity_consumption: totalElectricityEmission,
                appliances: appliances 
            },
            total_emission: {
                total_emission: totalEmission
            },
            plant_trees: {
                plant_trees: 0 
            }

        };
        console.log(postData);
        try {
            // Send POST request to backend
            const response = await axios.post('http://localhost:8081/transaction/data', postData);
            console.log(response.data); 
            // alert('Data stored successfully');
            navigate('/');
        } catch (error) {
            console.error('Error storing data:', error);
            alert('Failed to store data');
        }
    }

    return (
        <div className='res-contain'>
            <h4>Summary</h4>
            <div className="white-box">
                <div className="chart-box">
                    <h2>Your annual carbon footprint</h2>
                    <div className='semicircle'>
                        <Semi />
                    </div>

                    {/* Legend Section */}
                    <div className="legend-container">
                        <div className="legend-item">
                            <span className="legend-color commute-color"></span>
                            <span className="legend-label">Commute</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color food-color"></span>
                            <span className="legend-label">Food</span>
                        </div>
                        <div className="legend-item">
                            <span className="legend-color appliances-color"></span>
                            <span className="legend-label">Appliances</span>
                        </div>
                    </div>

                    <div className='graph-box'>
                        <img src={graph} alt='graph' className=''></img>
                        <p>Which is 25% higher than average</p>
                    </div>
                </div>

                <div className="sapling-box">
                    <img src={Tree} alt='tree' className='tree-img' />
                    <div className='text123'>Offset your excess carbon footprint by</div>
                    <h3>Planting {saplings} Saplings</h3>
                    <button  onClick={handlePlant}>Plant now to offset</button>
                </div>
                <div 
                  className='remind' 
                  style={{font: "normal normal 600 14px/16px Sarabun"}} 
                  onClick={handleRemindLater}>
                    Remind me later
                </div>
            </div>
        </div>
    );
};

export default Result;
