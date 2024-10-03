import React, { useState, useEffect } from 'react';
import CustomProgressBar from '../../components/progress/Progress';
import DiscreteSliderMarks from '../../components/slider/Slider';
import BackGround from '../../utils/BackGround';
import '../../components/singlebutton/ButtonSingle.css'
import { useNavigate } from 'react-router-dom';
import '../../styles/PageTwo.css';
import '../../styles/Vehicle.css';
import buttonbackground from '../../assets/buttonbackground.png'
import '../../components/doublebutton/DoubleButton.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addVehicleCount, resetVehicleDetails } from '../../slice/CalculationSlice';
import { goToNextStep, goToPreviousStep } from "../../slice/UserSlice";

const VehiclePageTwo = () => {
    const [vehicleCount, setVehicleCount] = useState(4)
    const globalvehicleValue = useSelector((s)=>s.carbonValue.vehicle.vehicle_value)
    
    const navigate = useNavigate();
    let minimum = 2
    let maximum = 10
    const dispatch = useDispatch()
    let backgroundImage = BackGround();

    const handleChange = (event, newvalue) => {
        setVehicleCount(Number(newvalue))
    };

    const handleNext = () => {
        dispatch(addVehicleCount({vehicleCount}))
        console.log(vehicleCount);
        dispatch(goToNextStep());
        navigate('/vehicle3')
    }
    const handleBack = () => {
        dispatch(resetVehicleDetails())
        dispatch(goToPreviousStep());
        navigate('/vehicle1')
    }

    return (
        <div className="vehiclemaincontainer">
            <div className="topbar" style={{ background: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <div className="topbarcontent">
                    <li>
                        <svg version="1.1" id="triangle-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
                            <path id="rect3338" d="M5.5174,1.2315      C5.3163,1.2253,5.1276,1.328,5.024,1.5l-4,6.6598C0.8013,8.5293,1.0679,8.9999,1.5,9h8c0.4321-0.0001,0.6987-0.4707,0.476-0.8402            l-4-6.6598C5.8787,1.3386,5.706,1.2375,5.5174,1.2315z">
                            </path>
                        </svg>
                    </li>
                    <li><h1>{(globalvehicleValue*vehicleCount).toFixed(2)} ton CO2</h1></li>
                </div>
            </div>
            <div className="bottombar" >
                <div className="numberrolling">
                    <CustomProgressBar />
                </div>
                <div>
                    <div className="vehicle-slider-container">
                        <h3>How many vehicles do you own?</h3>
                        <div className="bord">

                            <li className='emptyBorder'></li>
                            <li><DiscreteSliderMarks value={vehicleCount} onSliderChange={handleChange} max={maximum} min={minimum} /></li> 
                            <li className='emptyBorder'></li>
                        </div>
                        <div className="vehicle-count">
                            {vehicleCount} {vehicleCount === 1 ? "vehicle" : "vehicles"}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="buttondouble">
                        <div className='btns'>
                            <button className='back' onClick={handleBack}>Back</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehiclePageTwo;
