import React, { useState, useEffect } from 'react';
import CustomProgressBar from '../../components/progress/Progress';
import DiscreteSliderMarks from '../../components/slider/Slider';
import background from '../../assets/background1.png'
import '../../components/singlebutton/ButtonSingle.css'
import { useNavigate } from 'react-router-dom';
import '../../styles/PageTwo.css';
import '../../styles/Vehicle.css';
import buttonbackground from '../../assets/buttonbackground.png'
import '../../components/doublebutton/DoubleButton.css'

const VehiclePageTwo = () => {
    const [vehicles, setVehicles] = useState(4);
    const [carbonvalue, setcarbonvalue] = useState(vehicles * 2)
    const navigate = useNavigate();
    let minimum = 2
    let maximum = 10

    const handleChange = (event, newvalue) => {
        setVehicles(newvalue)
        setcarbonvalue(newvalue * 2)
    };

    const handleNext = () => {
        navigate('/vehicle3')
    }
    const handleBack = () => {
        navigate('/vehicle1')
    }

    return (
        <div className="vehiclemaincontainer">
            <div className="topbar" style={{ background: `url(${background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                <div className="topbarcontent">
                    <li>
                        <svg version="1.1" id="triangle-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
                            <path id="rect3338" d="M5.5174,1.2315      C5.3163,1.2253,5.1276,1.328,5.024,1.5l-4,6.6598C0.8013,8.5293,1.0679,8.9999,1.5,9h8c0.4321-0.0001,0.6987-0.4707,0.476-0.8402            l-4-6.6598C5.8787,1.3386,5.706,1.2375,5.5174,1.2315z">
                            </path>
                        </svg>
                    </li>
                    <li><h1>{carbonvalue} ton CO2</h1></li>
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
                            <li><DiscreteSliderMarks value={vehicles} onSliderChange={handleChange} max={maximum} min={minimum} /></li>
                            <li className='emptyBorder'></li>
                        </div>
                        <div className="vehicle-count">
                            {vehicles} {vehicles === 1 ? "vehicle" : "vehicles"}
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
