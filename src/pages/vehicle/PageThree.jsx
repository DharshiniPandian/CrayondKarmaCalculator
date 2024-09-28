import React, { useState, useEffect } from 'react';
import electric from '../../assets/electric.svg';
import petrol from '../../assets/petrol.png';

const PageThree = ({ updateCarbonValue, condition }) => {
    // const [activegas, setactivegas] = useState(false);
    // const [activeelectric, setactiveelectric] = useState(false);

    let [active , setactive] = useState("")
    let [nextcondition, setnextcondition]  = useState(false)
    useEffect(() => {
        let carbon = 0;
        if (active == "gas") carbon += 8; // Gas-powered adds more carbon
        if (active == "electric") carbon += 2; // Electric vehicles have lower carbon footprint
        updateCarbonValue(carbon); // Update carbon value in Vehicle component
        condition(nextcondition)
    }, [active]);


    return (
        <div className="content">
            <div className="text" style={{marginBottom:"1.2rem"}}>
                What type of fuel do you use?
            </div>
            <div className="options">
                <div className={active == "gas" ? "element-gas" : "element-gas-"} onClick={() =>{ setactive("gas"), setnextcondition(true)}}>
                    <li><img src={petrol} style={{height:"40px",width:"40px"}} alt="" /></li>
                    <li className='VehicleName'>petrol/deisel</li>
                </div>
                <div className={active == "electric" ? "element-electric" : "element-electric-"} onClick={() => {setactive("electric"), setnextcondition(true)}}>
                    <li><img src={electric} style={{height:"40px",width:"36.38px"}} alt="" /></li>
                    <li className='VehicleName'>Electric vehicle</li>
                </div>
            </div>
        </div>
    );
};

export default PageThree;
