import React, { useState, useEffect } from 'react';
import cycle from '../../assets/Bicycle.png';
import bike from '../../assets/bike.png';
import car from '../../assets/car.png';

const PageOne = ({ updateCarbonValue }) => {
    const [activecycle, setactivecycle] = useState(false);
    const [activebike, setactivebike] = useState(false);
    const [activecar, setactivecar] = useState(false);

    useEffect(() => {
        let carbon = 0;
        if (activecycle) carbon += 1; // Bicycle/Walk has low carbon value
        if (activebike) carbon += 5; // Two Wheeler carbon value
        if (activecar) carbon += 10; // Car carbon value
        updateCarbonValue(carbon); // Update carbon value in Vehicle component
    }, [activecycle, activebike, activecar]);

    return (
        <div className="content">
            <div className="text">
                <p>Choose the vehicles you use for commuting?</p>
            </div>
            <div className="options">
                <div className={activecycle ? "element-cycle" : "element-cycle-"} onClick={() => setactivecycle(!activecycle)}>
                    <li><img src={cycle} alt="" /></li>
                    <li>Bicycle/ <br />Walk</li>
                </div>
                <div className={activebike ? "element-bike" : "element-bike-"} onClick={() => setactivebike(!activebike)}>
                    <li><img src={bike} alt="" /></li>
                    <li>Two Wheeler</li>
                </div>
                <div className={activecar ? "element-car" : "element-car-"} onClick={() => setactivecar(!activecar)}>
                    <li><img src={car} alt="" /></li>
                    <li>Car</li>
                </div>
            </div>
        </div>
    );
};

export default PageOne;
