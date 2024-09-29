import React, { useState } from 'react'
import CustomProgressBar from '../../components/progress/Progress'
import { useNavigate } from 'react-router-dom'
import background from '../../assets/background2.png'
import '../../styles/Vehicle.css'
import '../../components/singlebutton/ButtonSingle.css'
import buttonbackground from '../../assets/buttonbackground.png'

const VehiclePageThree = () => {
    const [carbonvalue, setcarbonvalue] = useState(0)
    const [active, setActive] = useState("");
    const [vehicleid, setvehicleid] = useState(0)
    const [nextpagecondition, setnextpagecondition] = useState(false)
    // const vehicleData = useSelector((s) => s.masterVehicles);     // get data from the store
    const navigate = useNavigate();

    // Comment or  remove these sample values after the  API call is made

    const vehicleData = [
        { id: 1, name: "petrol/deisel", path: './images/petrol.png', value: 10 },
        { id: 2, name: "electric", path: './images/electric.svg', value: 20 },
    ]



    const styles = [
        {
            id: 1,
            backgroundColor: "#EEF6FF",
            borderColor: "#aed3fc",
        },
        {
            id: 1,
            backgroundColor: "#FFF4E6",
            borderColor: "#FFC478",
        },
        {
            id: 1,
            backgroundColor: "#FFF4F3",
            borderColor: "#EE928A",
        },
    ];


    const handleVehicleSelection = (vehicle) => {
        setActive(vehicle.name)
        setcarbonvalue(vehicle.value)
        setvehicleid(vehicle.id)
        setnextpagecondition(true)
    }

    const handleNext = () => {
        if (nextpagecondition) {
            navigate('/vehicle4')
        }
        else {
            alert("please SelectOne !")
        }

    }
    const handleBack = () => {
        navigate('/vehicle2')
    }

    // console.log(carbonvalue, vehicleid , active)
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
            <div className="bottombar">
                <div className="numberrolling">
                    <CustomProgressBar />
                </div>
                <div>
                    <div className="content">
                        <div className="text">
                            What type of fuel do you use?
                        </div>
                        <div className="options">
                            {vehicleData.map((vehicle, key) => (
                                <div
                                    style={{
                                        backgroundColor: styles[key].backgroundColor,
                                        border: active === vehicle.name ? `2px solid ${styles[key].borderColor}` : "0px",
                                        borderColor: styles[key].borderColor,
                                        cursor: "pointer"
                                    }}
                                    className="element-bike-"
                                    key={key}
                                    onClick={() => handleVehicleSelection(vehicle)}
                                >
                                    <li>
                                        <img src={vehicle.path} alt="" />
                                    </li>
                                    <li className="VehicleName">{vehicle.name}</li>
                                </div>
                            ))}
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

export default VehiclePageThree;
