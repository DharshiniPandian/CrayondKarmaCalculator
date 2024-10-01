import React from 'react';
import Backimg from '../../assets/background.svg';
import Tree from '../../assets/Deciduous Tree.png';
import graph from '../../assets/graph.png';
import './Result.css';
import Semi from "../Result/chart";
import { useSelector } from 'react-redux';
import { goToNextStep } from "../../slice/UserSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Result = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handlePlant = () => {
        dispatch(goToNextStep());
        navigate('/tree-form');
    }

    const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);
    const saplings = (totalVehicleEmission/200).toFixed();

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
                <div className='remind' style={{font: "normal normal 600 14px/16px Sarabun"}}>
                    Remind me later
                </div>
            </div>
        </div>
    );
};

export default Result;
