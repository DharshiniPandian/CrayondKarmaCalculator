import React, { useState, useEffect } from 'react';
import electric from '../../assets/electric.svg';
import petrol from '../../assets/petrol.png';

const PageThree = ({ updateCarbonValue }) => {
    const [activegas, setactivegas] = useState(false);
    const [activeelectric, setactiveelectric] = useState(false);

    useEffect(() => {
        let carbon = 0;
        if (activegas) carbon += 8; // Gas-powered adds more carbon
        if (activeelectric) carbon += 2; // Electric vehicles have lower carbon footprint
        updateCarbonValue(carbon); // Update carbon value in Vehicle component
    }, [activegas, activeelectric]);

    return (
        <div className="content">
            <div className="text">
                <p>What type of fuel do you use?</p>
            </div>
            <div className="options">
                <div className={activegas ? "element-gas" : "element-gas-"} onClick={() => setactivegas(!activegas)}>
                    <li><img src={petrol} alt="" /></li>
                    <li>Gasoline</li>
                </div>
                <div className={activeelectric ? "element-electric" : "element-electric-"} onClick={() => setactiveelectric(!activeelectric)}>
                    <li><img src={electric} alt="" /></li>
                    <li>Electric</li>
                </div>
            </div>
        </div>
    );
};

export default PageThree;
