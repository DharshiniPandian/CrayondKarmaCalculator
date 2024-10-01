import React, { useState, useEffect } from 'react';
import CustomProgressBar from '../../components/progress/Progress';
import { useSelector } from "react-redux";
import '../../styles/Vehicle.css'
import background from '../../assets/background1.png'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addMasterVehiclesData } from '../../slice/MasterApiSlices';
import '../../components/singlebutton/ButtonSingle.css'
import { useNavigate } from 'react-router-dom';
import buttonbackground from '../../assets/buttonbackground.png'
import { selectVehicle } from '../../slice/CalculationSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/toast.css'

const VehiclePageOne = () => {
  const [vehicleValue, setVehicleValue] = useState(0)
  const [active, setActive] = useState("");
  const [vehicleId, setVehicleId] = useState(0)
  const [nextpagecondition, setnextpagecondition] = useState(false)
  const vehicleData = useSelector((s) => s.masterVehicles);
  const navigate = useNavigate();
  const globalCarbonValue = useSelector((s)=>s.carbonValue.total_emission.total_emission)

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

  const dispatch = useDispatch()

  const fetchmasterVehicles = async () => {
    try {
      // const response = await axios.get('http://10.40.33.125:8081/master/vehicles');
      const response = await axios.get('http://localhost:8081/master/vehicles');
      if (response.status === 200)
        dispatch(addMasterVehiclesData(response.data))
    }
    catch (error) {
      console.log("error while fetching data", error);
    }
  }

  useEffect(() => {
    fetchmasterVehicles()
  }, [])

  const handleVehicleSelection = (vehicle) => {
    setActive(vehicle.name)
    setVehicleValue(Number(vehicle.value))
    setVehicleId(vehicle.id)
    setnextpagecondition(true)
  }

  const NextFunction = () => {
  
    if (nextpagecondition) {
      navigate('/vehicle2')
      dispatch(selectVehicle({vehicleId,vehicleValue}))
    }
    else {
      // Display a toast notification if no vehicle is selected
      toast.warn("Please select a vehicle before proceeding!", {
        className: "custom-toast", // Custom class for warning toast
        bodyClassName: "custom-toast-body", // Custom class for the body
        progressClassName: "custom-toast-progress", // Custom class for the progress bar
      });
    }
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
          <li><h1>{vehicleValue?vehicleValue:globalCarbonValue} ton CO2</h1></li>
        </div>
      </div>
      <div className="bottombar" >
        <div className="numberrolling">
          <CustomProgressBar />
        </div>
        <div>
          <div className="content">
            <div className="text">
              Choose the vehicles you use for commuting?
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
          <div className="buttonsingle">
            <button onClick={NextFunction}>Next</button>
          </div>
        </div>
      </div>
       {/* Toast Container for displaying notifications */}
       <ToastContainer 
        position="top-center"
        autoClose={3000} // Set auto-close time
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default VehiclePageOne;
