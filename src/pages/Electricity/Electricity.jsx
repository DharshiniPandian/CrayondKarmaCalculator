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
import { fontGrid } from "@mui/material/styles/cssUtils";
import { fontFamily, fontWeight } from "@mui/system";

export default function Electricity() {
  const [CarbonValue, setCarbonValue] = useState(0);
  const [ElectricityUnit, setElectricityUnit] = useState(100);
  const [value, setValue] = useState(75);
  const navigate = useNavigate();

  let minimum = 100;
  let maximum = 1000;

  const handleChange = (event, newvalue) => {
    setElectricityUnit(newvalue);
  };

  useEffect(() => {
    setCarbonValue(ElectricityUnit / 10);
  }, [ElectricityUnit]);

  useEffect(() => {
    let timer;
    if (value < 100) {
      timer = setTimeout(() => setValue(value + 1), 20);
    }
    return () => clearTimeout(timer);
  }, [value]);

  const handleNavigateto = () => {
    navigate("/result");
  };

  return (
    <div style={{ width: "100%", border: "1px solid #E8F2FF", height: "100%" }}>
      <div className="electricity-top">
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {CarbonValue} ton CO2
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
              value={ElectricityUnit}
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
        <button className="electricity-units">{ElectricityUnit} units</button>
      </div>
      <div className="calculate-container">
        <button className="calculate-button" onClick={handleNavigateto}>
          Calculate carbon footprint
        </button>
      </div>
    </div>
  );
}
