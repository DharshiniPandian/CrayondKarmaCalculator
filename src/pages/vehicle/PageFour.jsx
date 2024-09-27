import React, { useState, useEffect } from 'react';
import './PageTwo.css';

const PageFour = ({ updateCarbonValue }) => {
    const [vehicles, setVehicles] = useState(80);

    useEffect(() => {
        // Assuming carbon value increases based on distance travelled
        updateCarbonValue(vehicles * 0.1); // For example, each kilometer adds 0.1 ton CO2.
    }, [vehicles]);

    const handleChange = (event) => {
        setVehicles(event.target.value);
    };

    return (
        <div className="vehicle-slider-container">
            <h3>How many kilometers do you travel?</h3>
            <div className="bord">
                <li>
                    <input
                        type="range"
                        min="10"
                        max="250"
                        value={vehicles}
                        onChange={handleChange}
                        className="slider"
                    />
                </li>
            </div>
            <div className="vehicle-count">
                {vehicles} km
            </div>
        </div>
    );
};

export default PageFour;
