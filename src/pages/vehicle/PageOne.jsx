import React, { useState, useEffect } from "react";
import cycle from "../../assets/Bicycle.png";
import bike from "../../assets/bike.png";
import car from "../../assets/car.png";
import { RiUserStarFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const PageOne = ({ updateCarbonValue, condition }) => {
  // const [activecycle, setactivecycle] = useState(false);
  // const [activebike, setactivebike] = useState(false);
  // const [activecar, setactivecar] = useState(false);

  let [active, setactive] = useState("");
  let [nextcondition, setnextcondition] = useState(false);
  useEffect(() => {
    let carbon = 0;
    if (active == "cycle") carbon = 2; // Bicycle/Walk has low carbon value
    if (active == "bike") carbon = 5; // Two Wheeler carbon value
    if (active == "car") carbon = 10; // Car carbon value
    updateCarbonValue(carbon); // Update carbon value in Vehicle component
    condition(nextcondition);
  }, [active]); 
  const vehicleData = useSelector((s) => s.masterVehicles);

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

  return (
    <div className="content">
      <div className="text">
        Choose the vehicles you use for commuting?
      </div>
      <div className="options">
        {vehicleData.map((vehicle, key) => (
          <div
            style={{ 
                backgroundColor: styles[key].backgroundColor,
                border: active === vehicle.name ? `2px solid ${styles[key].borderColor}`:"0px",
                borderColor:styles[key].borderColor,
                cursor:"pointer"
            }}
            className="element-bike-"
            onClick={() => {
              setactive(vehicle.name), setnextcondition(true);
            }}
          >
            <li>
              <img src={vehicle.path} alt="" />
            </li>
            <li className="VehicleName">{vehicle.name}</li>
          </div>
        ))}
        {/* <div
          className={active == "cycle" ? "element-cycle" : "element-cycle-"}
          onClick={() => {
            setactive("cycle"), setnextcondition(true);
          }}
        >
          <li>
            <img src={cycle} alt="" />
          </li>
          <li>
            Bicycle/ <br />
            Walk
          </li>
        </div>
        <div
          style={{ styles }}
          className={active == "bike" ? "element-bike" : "element-bike-"}
          onClick={() => {
            setactive("bike"), setnextcondition(true);
          }}
        >
          <li>
            <img src={bike} alt="" />
          </li>
          <li>Two Wheeler</li>
        </div>
        <div
          className={active == "car" ? "element-car" : "element-car-"}
          onClick={() => {
            setactive("car"), setnextcondition(true);
          }}
        >
          <li>
            <img src={car} alt="" />
          </li>
          <li>Car</li>
        </div> */}
      </div>
    </div>
  );
};

export default PageOne;
