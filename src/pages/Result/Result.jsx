import React from 'react';
import Backimg from '../../assets/background.svg';
import Tree from '../../assets/Deciduous Tree.png';
import graph from '../../assets/graph.png';
import './Result.css';
import Semi from "../Result/chart";
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const navigate = useNavigate();

    const handlePlant = () => {
        navigate('/tree-form');
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
                    <p>Offset your excess carbon footprint by</p>
                    <h3>Planting 15 Saplings</h3>
                    <button onClick={handlePlant}>Plant now to offset</button>
                </div>
                <div className='remind'>
                    <p>Remind me later</p>
                </div>
            </div>
        </div>
    );
};

export default Result;
