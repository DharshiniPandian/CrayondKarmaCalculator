import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";
import "../../styles/Electricity.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import DiscreteSliderMarksElectricity from "../../components/slider/SliderforElectricity";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch , useSelector } from "react-redux";
import { addElectricityValue } from "../../slice/CalculationSlice";
import { fontGrid } from "@mui/material/styles/cssUtils";
import { fontFamily, fontWeight } from "@mui/system";

export default function Electricity() {
  const [electricityValue, setElectricityValue] = useState(0);
  const [electricityId, setElectricityId] = useState(200);
  const [CarbonValue, setCarbonValue] = useState(0);
  // const [ElectricityUnit, setElectricityUnit] = useState(200);
  const [value, setValue] = useState(75);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalVehicleEmission = useSelector((state) => state.carbonValue.vehicle.total_vehicle_emission);
  const totalFoodEmission = useSelector((state) => state.carbonValue.food.total_food_emission);
  const totalAppliancesEmission = useSelector((state) => state.carbonValue.appliances.total_appliances_emission);

  let minimum = 100;
  let maximum = 1000;

  const handleChange = (event, newvalue) => {
    setElectricityId(newvalue);
  };

  useEffect(() => {
    setElectricityValue(electricityId / 10);
  }, [electricityId]);

  useEffect(() => {
    let timer;
    if (value < 100) {
      timer = setTimeout(() => setValue(value + 1), 20);
    }
    return () => clearTimeout(timer);
  }, [value]);

  const handleNavigateto = () => {
    dispatch(addElectricityValue({electricityId, electricityValue}))
    navigate("/result");
  };

  return (
    <div style={{ width: "100%", border: "1px solid #E8F2FF", height: "100%" }}>
      <div className="electricity-top">
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {totalVehicleEmission+totalFoodEmission+totalAppliancesEmission+electricityValue} ton CO2
        </div>
      </div>
      <div className="electricity-bottom">
        <div className="loader">
          <div style={{ width: 54, height: 54 }}>
            <CircularProgressbarWithChildren
              className="custom-progressbar"
              value={value}
              text={`4/4`}
              circleRatio={1}
              styles={buildStyles({
                textSize: "30px",
                pathColor: "#FEA062",
                textColor: "#FEA062",
                trailColor: "#FFF4E4",
                backgroundColor: "#F39C12",
              })}
              strokeWidth={12}></CircularProgressbarWithChildren>
          </div>
        </div>
        <div className="electricity-ques">
          How much electricity do you consume for a month?
        </div>
        <div className="electricity-products">
          <div className="electricity-bord">
            {/* <div className="electricity-range">
          <hr className="vr-bar"/>
            <input
              type="range"
              min="100"
              max="1000"
              value={ElectricityUnit}
              onChange={(e) => setElectricityUnit(e.target.value)}
              className="electricity-slider"
            />
            <hr className="vr-bar"/>
            </div> */}
            <DiscreteSliderMarksElectricity
              value={electricityId}
              onSliderChange={handleChange}
              max={maximum}
              min={minimum}
            />
            {/* <div className="electricity-units-static">
              <p>100 units</p>
              <p>1000 units</p>
            </div> */}
          </div>
        </div>
        <button className="electricity-units">{electricityId} units</button>
      </div>
      <div className="calculate-container">
        <button className="calculate-button" onClick={handleNavigateto}>
          Calculate carbon footprint
        </button>
      </div>
    </div>
  );
}
