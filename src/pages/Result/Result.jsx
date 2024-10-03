import React from 'react';
import Backimg from '../../assets/background.svg';
import Tree from '../../assets/Deciduous Tree.png';
import ggraph from '../../assets/greenGraph.svg';
import rgraph from '../../assets/redGraph.svg'
import './Result.css';
import Semi from "../Result/chart";
import ReportBackground from '../../utils/ReportBackground';
import { useSelector } from 'react-redux';
import { goToNextStep } from "../../slice/UserSlice";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { MasterTransactionApi } from '../../utils/ApiEndpoints/API';

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePlant = () => {
        dispatch(goToNextStep());
        navigate('/tree-form');
    }
    let backgroundImage = ReportBackground();

    const grandTotalEmission = useSelector((state) => state.carbonValue.total_emission.total_emission);
    const saplings = (grandTotalEmission / 1.2).toFixed(2);
    const carbonPercentage = (((grandTotalEmission - 16) / 16) * 100)
    const vehicleId = useSelector((state) => state.carbonValue.vehicle.vehicle_id);
    const vehicleCount = useSelector((state) => state.carbonValue.vehicle.vehicle_count);
    const fuelId = useSelector((state) => state.carbonValue.vehicle.fuel_id);
    const travelDistance = useSelector((state) => state.carbonValue.vehicle.travel_distance);
    const foodId = useSelector((state) => state.carbonValue.food.food_id);
    const totalEmission = useSelector((state) => state.carbonValue.total_emission.total_emission);
    const totalElectricityEmission = useSelector((state) => state.carbonValue.electricity.total_electricity_emission);
    const appliances = useSelector((state) => state.carbonValue.appliances.appliance_id)

    console.log("Vehicle ID:", vehicleId);
    console.log("Vehicle Count:", vehicleCount);
    console.log("Fuel ID:", fuelId);
    console.log("Travel Distance:", travelDistance);
    console.log("Food ID:", foodId);
    console.log("Total Emission:", totalEmission);
    console.log("Total Electricity Emission:", totalElectricityEmission);
    console.log("Appliances", appliances);
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
                electricity_consumption: (totalElectricityEmission * 100),
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
            const response = await axios.post(MasterTransactionApi, postData);
            console.log(response.data);
            // alert('Data stored successfully');
            navigate('/');
        } catch (error) {
            console.error('Error storing data:', error);
            alert('Failed to store data');
        }
    }


    return (
        <div className='res-contain' style={{background:`url(${backgroundImage})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center bottom"}}>
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

                    {carbonPercentage > 0 ?
                        <div className='graph-box' style={{ backgroundColor: "#f8d1d1", color: "#FF5757" }}>
                            <img src={rgraph} alt='graph' className=''></img>


                            <p>Which is {Math.round(Math.abs(carbonPercentage))}% higher than average</p>

                        </div> :
                        <div className='graph-box' style={{ backgroundColor: "#d6f8d1", color: "#175a11" }}>
                            <img src={ggraph} alt='graph' className=''></img>

                            <p>Which is {Math.round(Math.abs(carbonPercentage))}% lower than average</p>

                        </div>
                    }
                </div>

                <div className="sapling-box">
                    <img src={Tree} alt='tree' className='tree-img' />
                    {
                        carbonPercentage > 0 ?
                            <>
                                <div className='text123'>Offset your excess carbon footprint by</div>
                                <h3>Planting {Math.round(saplings)} Saplings</h3>
                                <button onClick={handlePlant}>Plant now to offset</button>
                            </>
                            :
                            <>
                                <div className='text123'>Are you willing to plant Saplings</div>
                                <button onClick={handlePlant}>Willing to plant</button>
                            </>
                    }
                </div>
                <div
                    className='remind'
                    style={{ font: "normal normal 600 14px/16px Sarabun" }}
                    onClick={handleRemindLater}>
                    Remind me later
                </div>
            </div>
        </div>
    );
};

export default Result;
