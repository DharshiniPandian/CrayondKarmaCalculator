import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";
import "../../styles/Food.css";
import Button from "../Button/Button";
import BackGround from "../../utils/BackGround";
import { goToNextStep, goToPreviousStep } from "../../slice/UserSlice";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMasterFoodsData } from "../../slice/MasterApiSlices";
import { revertTravelDistance, selectFoodType } from "../../slice/CalculationSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/toast.css";

export default function Food() {
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [CarbonValue, setCarbonValue] = useState(0);
  const [foodId, setFoodId] = useState(0);
  const [foodValue, setFoodValue] = useState(0);
  const [foodName, setFoodName] = useState(false);
  const foodData = useSelector((s) => s.masterFoodItems);
  const globalCarbonValue = useSelector((s)=>s.carbonValue.total_emission.total_emission)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState(25);

  const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);

  useEffect(() => {
    let timer;
    if (value < 50) {
      timer = setTimeout(() => setValue(value + 1), 20);
    }
    return () => clearTimeout(timer);
  }, [value]);

  const styles = [
    {
      id: 1,
      borderColor: "#3ea957",
      backgroundColor: "#E4FFEE",
    },
    {
      id: 2,
      borderColor: "#FFBA63",
      backgroundColor: "#FFF4E6",
    },
    {
      id: 3,
      borderColor: "#EB7E74",
      backgroundColor: "#FFF4F3",
    },
  ];

  const handleItemClicked = (food) => {
    setFoodName(food.name);
    setFoodId(food.id);
    setFoodValue(Number(food.value));
    // console.log("Selected Food Name =", food.name);
    // console.log("Selected Food ID =", food.id);
    // console.log("Selected Food Value =", Number(food.value));
  };

  const NextFunction = () => {
    if (foodId) {
      dispatch(goToNextStep());
      navigate("/Appliance", { state: { foodId } });
      dispatch(selectFoodType({ foodId, foodValue }));
    } else {
      // Display a toast notification if no vehicle is selected
              toast.warn("Please select a Food Item before proceeding!", {
                className: "custom-toast", // Custom class for warning toast
                bodyClassName: "custom-toast-body", // Custom class for the body
                progressClassName: "custom-toast-progress", // Custom class for the progress bar
              });
    }
  };

  useEffect(() => {
    fetchmasterFoodItems();
  }, []);

  const fetchmasterFoodItems = async () => {
    try {
      const response = await axios.get("http://localhost:8081/master/foods");
      if (response.status === 200) dispatch(addMasterFoodsData(response.data));
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };

  // console.log(totalVehicleEmission)

  return (
    <div style={{ width: "100%", border: "1px solid #E8F2FF",height: "100%" }}>
      <div className="food-top" style={{background:`url(${BackGround()})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {Number(totalVehicleEmission+foodValue).toFixed(2)} ton CO2
        </div>
      </div>
      <div className="food-bottom">
        <div className="loader">
          <div style={{ width: 54, height: 54 }}>
            <CircularProgressbarWithChildren
              className="custom-progressbar"
              value={value}
              text={`2/4`}
              circleRatio={1}
              styles={buildStyles({
                textSize: "30px",
                pathColor: "#FEA062",
                textColor: "#FEA062",
                trailColor: "#FFF4E4",
                backgroundColor: "#F39C12",
              })}
              strokeWidth={12}
            ></CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="food-ques">What you normally eat?</div>
        <div className="food-products">
          {foodData.map((food, key) => (
            <div
              key={key}
              className={`food-items ${
                foodName === food.name ? "selected" : ""
              }`}
              style={{
                backgroundColor: styles[key].backgroundColor,
                border: foodName === food.name ? `2px solid ${styles[key].borderColor}` : "0px",
                //  borderColor : styles[key].transparent,
                // borderWidth: "2px",
                // borderStyle: "solid",
              }}
              onClick={() => handleItemClicked(food)}
            >
              <img
                src={food.path}
                style={{ width: "35px", height: "35px" }}
                alt=""
              />
              <div
                style={{
                  fontWeight: "420",
                  fontSize: "13px",
                  fontFamily: "Excon, sans-serif",
                }}
              >
                {food.name}
              </div>
            </div>
          ))}
        </div>   
      <div className="foodStaticBtn" >
        <Button
          onBack={() => {
            dispatch(revertTravelDistance());
            dispatch(goToPreviousStep());
            navigate("/Vehicle4", { state: { activepage: "pagefour" } });
          }}
          onNext={NextFunction} 
        />
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
