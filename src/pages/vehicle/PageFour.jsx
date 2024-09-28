import React, { useState, useEffect } from 'react';
import '../../styles/PageTwo.css';
import DiscreteSliderMarks from '../../components/slider/Slider';

const PageFour = ({ updateCarbonValue }) => {
    const [vehicles, setVehicles] = useState(80);
    let minimum = 10
    let maximum = 250


    useEffect(() => {
        // Assuming carbon value increases based on distance travelled
        updateCarbonValue(vehicles * 0.1); // For example, each kilometer adds 0.1 ton CO2.
    }, [vehicles]);

    const handleChange = (event, newvalue) => {
        setVehicles(newvalue)
    };

    return (
        <div className="vehicle-slider-container">
            <h3>How many kilometers do you travel?</h3>
            <div className="bord">
                {/* <li>
                    <input
                        type="range"
                        min="10"
                        max="250"
                        value={vehicles}
                        onChange={handleChange}
                        className="slider"
                    />
                </li> */}
                <DiscreteSliderMarks value = {vehicles} onSliderChange={handleChange} max = {maximum} min = {minimum}/>

            </div>
            <div className="vehicle-count">
                {vehicles} km
            </div>
        </div>
    );
};

export default PageFour;
