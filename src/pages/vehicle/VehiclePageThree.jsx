import React, { useEffect, useState } from "react";
import CustomProgressBar from "../../components/progress/Progress";
import { useNavigate } from "react-router-dom";
import BackGround from "../../utils/BackGround";
import "../../styles/Vehicle.css";
import "../../components/singlebutton/ButtonSingle.css";
import buttonbackground from "../../assets/buttonbackground.png";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addMasterVehicleFuelTypeDatas } from "../../slice/MasterApiSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toast.css";
import { revertVehicleCount, selectFuelType } from "../../slice/CalculationSlice";
import { goToNextStep, goToPreviousStep } from "../../slice/UserSlice";

const VehiclePageThree = () => {
  const [fuelValue, setFuelValue] = useState(0);
  const [active, setActive] = useState("");
  const [fuelId, setFuelId] = useState(0);
  const [nextpagecondition, setnextpagecondition] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const vehicleData = useSelector((s) => s.masterVehicleFuelType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalCarbonValue = useSelector((s) => s.carbonValue.total_emission.total_emission);
  console.log(vehicleData)
  let backgroundImage = BackGround();
  // Comment or  remove these sample values after the  API call is made

  // Styles for fuel types
  const styles = [
    { id: 1, backgroundColor: "#FFF4F3", borderColor: "#EB7E74" },
    { id: 2, backgroundColor: "#FFF4E6", borderColor: "#FFBA63" },
  ];

  // Fetch fuel types from the server
  const fetchmasterVehicleFuelTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/master/fuels");
      if (response.status === 200) {
        dispatch(addMasterVehicleFuelTypeDatas(response.data));
        setTimeout(() => setLoading(false), 1000); // Set loading false after 1 second
      }
    } catch (error) {
      console.log("Error while fetching data", error);
    }
  };

  useEffect(() => {
    fetchmasterVehicleFuelTypes();
  }, []);

  const handleFuelSelection = (fuel) => {
    setActive(fuel.name);
    setFuelValue(Number(fuel.value));
    setFuelId(fuel.id);
    setnextpagecondition(true);
  };

  const handleNext = () => {
    if (nextpagecondition) {
      dispatch(selectFuelType({ fuelId, fuelValue }));
      dispatch(goToNextStep());
      navigate("/vehicle4");
    } else {
      toast.warn("Please select a fuel type before proceeding!", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
        progressClassName: "custom-toast-progress",
      });
    }
  };

  const handleBack = () => {
    dispatch(revertVehicleCount());
    dispatch(goToPreviousStep());
    navigate("/vehicle2");
  };

  return (
    <div className="vehiclemaincontainer">
      <div
        className="topbar"
        style={{
          background: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="topbarcontent">
          <li>
            <svg version="1.1" id="triangle-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
              <path id="rect3338" d="M5.5174,1.2315 C5.3163,1.2253,5.1276,1.328,5.024,1.5l-4,6.6598C0.8013,8.5293,1.0679,8.9999,1.5,9h8c0.4321-0.0001,0.6987-0.4707,0.476-0.8402 l-4-6.6598C5.8787,1.3386,5.706,1.2375,5.5174,1.2315z"></path>
            </svg>
          </li>
          <li>
            <h1>{fuelValue ? (globalCarbonValue + fuelValue).toFixed(2) : globalCarbonValue.toFixed(2)} ton CO2</h1>
          </li>
        </div>
      </div>
      <div className="bottombar">
        <div className="numberrolling">
          <CustomProgressBar />
        </div>
        <div className="content">
          <div className="text" style={{ marginBottom: "20px" }}>
            What type of fuel do you use?
          </div>
          <div className="options">
            {loading
              ? Array(2).fill().map((_, key) => (
                  <div key={key} className="skeleton-wrapper">
                    <Skeleton height={110} width={110} />
                  </div>
                ))
              : vehicleData.map((fuel, key) => (
                  <div
                    style={{
                      backgroundColor: styles[key].backgroundColor,
                      border: active === fuel.name ? `2px solid ${styles[key].borderColor}` : "0px",
                      cursor: "pointer",
                    }}
                    className="element-bike-"
                    key={key}
                    onClick={() => handleFuelSelection(fuel)}
                  >
                    <li>
                      <img src={fuel.path} height={"40px"} width={"40px"} alt="" />
                    </li>
                    <li className="VehicleName">{fuel.name}</li>
                  </div>
                ))}
          </div>
        </div>
        <div className="buttondouble">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
};

export default VehiclePageThree;
