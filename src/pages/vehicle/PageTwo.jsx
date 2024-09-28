import React, { useState, useEffect } from 'react';
import './PageTwo.css';
import DiscreteSliderMarks from './sample';

const PageTwo = ({ updateCarbonValue }) => {
    const [vehicles, setVehicles] = useState(4);
    let minimum = 0
    let maximum = 10


    useEffect(() => {
        // Update carbon value based on vehicle count, for example, each vehicle adds 2 tons of CO2.
        updateCarbonValue(vehicles * 2);
    }, [vehicles]);

    const handleChange = (event, newvalue) => {
        setVehicles(newvalue)
    };
    

    return (

        
        <div className="vehicle-slider-container">
    
            <h3>How many vehicles do you own?</h3>
            <div className="bord">
                {/* <li>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        value={vehicles}
                        onChange={handleChange}
                        className="slider"
                    />
                </li> */}
                <DiscreteSliderMarks value = {vehicles} onSliderChange={handleChange} max = {maximum} min = {minimum}/>
            </div>
            <div className="vehicle-count">
                {vehicles} {vehicles === 1 ? "vehicle" : "vehicles"}
            </div>
        </div>
    );
};

export default PageTwo;
