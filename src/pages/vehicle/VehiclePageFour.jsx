import React, { useState, useEffect } from 'react';
import CustomProgressBar from '../../components/progress/Progress';
import DiscreteSliderMarks from '../../components/slider/Slider';
import BackGround from '../../utils/BackGround';
import '../../components/singlebutton/ButtonSingle.css'
import { useNavigate } from 'react-router-dom';
import '../../styles/PageTwo.css';
import '../../styles/Vehicle.css';
import '../../components/doublebutton/DoubleButton.css'
import buttonbackground from '../../assets/buttonbackground.png'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addTravelDistance, revertFuelUse } from '../../slice/CalculationSlice'
import { goToNextStep, goToPreviousStep } from "../../slice/UserSlice";


const VehiclePageFour = () => {
    const [travelDistance, setTravelDistance] = useState(40);
    const globalCarbonValue = useSelector((s)=>s.carbonValue.total_emission.total_emission)
    const navigate = useNavigate();
    let minimum = 10
    let maximum = 250
    const dispatch = useDispatch()

    const handleChange = (event, newvalue) => {
        setTravelDistance(Number(newvalue))
    };

    const handleNext = () => {
        dispatch(addTravelDistance({travelDistance}))
        dispatch(goToNextStep());
        navigate('/food')
        
    }
    const handleBack = () => {
        dispatch(revertFuelUse())
        dispatch(goToPreviousStep());
        navigate('/vehicle3')
    }

    return (
        <div className="vehiclemaincontainer">
            <div className="topbar" style={{ background: `url(${BackGround()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <div className="topbarcontent">
                    <li>
                        <svg version="1.1" id="triangle-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
                            <path id="rect3338" d="M5.5174,1.2315      C5.3163,1.2253,5.1276,1.328,5.024,1.5l-4,6.6598C0.8013,8.5293,1.0679,8.9999,1.5,9h8c0.4321-0.0001,0.6987-0.4707,0.476-0.8402            l-4-6.6598C5.8787,1.3386,5.706,1.2375,5.5174,1.2315z">
                            </path>
                        </svg>
                    </li>
                    <li><h1>{(globalCarbonValue + (travelDistance / 10)).toFixed(2)} ton CO2</h1></li>
                </div>
            </div>
            <div className="bottombar">
                <div className="numberrolling">
                    <CustomProgressBar />
                </div>
                <div>
                    <div className="vehicle-slider-container">
                        <h3>How many kilometers you drive per week?</h3>
                        <div className="bord">

                            <li className='emptyBorder'></li>
                            <li><DiscreteSliderMarks value={travelDistance} onSliderChange={handleChange} max={maximum} min={minimum} /></li>
                            <li className='emptyBorder'></li>
                        </div>
                        <div className="vehicle-count">
                            {travelDistance} km
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

export default VehiclePageFour;
