import React, { useState, useEffect } from 'react';
import './PageTwo.css';

const PageTwo = ({ updateCarbonValue }) => {
    const [vehicles, setVehicles] = useState(4);

    useEffect(() => {
        // Update carbon value based on vehicle count, for example, each vehicle adds 2 tons of CO2.
        updateCarbonValue(vehicles * 2);
    }, [vehicles]);

    const handleChange = (event) => {
        setVehicles(event.target.value);
    };

    return (
        <div className="vehicle-slider-container">
            <h3>How many vehicles do you own?</h3>
            <div className="bord">
                <li>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        value={vehicles}
                        onChange={handleChange}
                        className="slider"
                    />
                </li>
            </div>
            <div className="vehicle-count">
                {vehicles} {vehicles === 1 ? "vehicle" : "vehicles"}
            </div>
        </div>
    );
};

export default PageTwo;
