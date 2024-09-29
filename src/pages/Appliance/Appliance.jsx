import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";
import "../../styles/Appliance.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "../Button/Button";

export default function Appliance() {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const [CarbonValue, setCarbonValue] = useState(0);
  const [value, setValue] = useState(50);

  useEffect(() => {
    let timer;
    if (value < 75) {
      timer = setTimeout(() => setValue(value + 1), 20);
    }
    return () => clearTimeout(timer);
  }, [value]);

  const AppliancesProducts = [
    {
      id: 1,
      name: "Fridge",
      borderColor: "#3ea957",
      backgroundColor: "#E4FFEE",
      carbon: "10.5",
    },
    {
      id: 2,
      name: "AC",
      borderColor: "#FFBA63",
      backgroundColor: "#FFF4E6",
      carbon: "11.5",
    },
    {
      id: 3,
      name: "Chimney",
      borderColor: "#EB7E74",
      backgroundColor: "#FFF4F3",
      carbon: "12.5",
    },
    {
      id: 4,
      name: "Washing machine",
      borderColor: "#EF9BC5",
      backgroundColor: "#F9F5F7",
      carbon: "13.5",
    },
    {
      id: 5,
      name: "Electric Vehicles",
      borderColor: "violet",
      backgroundColor: "#FCF5FF",
      carbon: "14.5",
    },
    {
      id: 6,
      name: "Air cooler",
      borderColor: "skyblue",
      backgroundColor: "#E4FBFF",
      carbon: "15.5",
    },
    {
      id: 7,
      name: "Mixer/ Grinder",
      borderColor: "#EB7E74",
      backgroundColor: "#FFF4F3",
      carbon: "16.5",
    },
  ];

  const handleItemClicked = (itemId) => {
    setSelectedItems((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(itemId)) {
        newSelected = prevSelected.filter((id) => id !== itemId);
      } else {
        newSelected = [...prevSelected, itemId];
      }
      const newCarbonValue = newSelected.reduce((acc, id) => {
        const item = AppliancesProducts.find((product) => product.id === id);
        return acc + (item ? parseFloat(item.carbon) : 0);
      }, 0);
      setCarbonValue(newCarbonValue);
      return newSelected;
    });
  };

  useEffect(() => {
    console.log("Selected items:", selectedItems);
  }, [selectedItems]);

  return (
    <div>
      <div className="appliance-top">
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {CarbonValue}ton CO2
        </div>
        <div className="white-screen">
          <div className="loader">
            <div style={{ width: "80px" }}>
              <CircularProgressbarWithChildren
                className="custom-progressbar"
                value={value}
                circleRatio={1}
                styles={buildStyles({
                  pathTransitionDuration: 0.5,
                  strokeWidth: 20,
                  rotation: 0,
                  trailColor: "#FFF4E4",
                  pathColor: "#FEA062",
                })}
              >
                <div className="rotation-value">3/4</div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
      <div className="appliance-bottom">
        <div className="appliance-ques">
          Select the appliances you use at your home
        </div>
        <div className="appliance-products">
          {AppliancesProducts.map((item) => (
            <div
              key={item.id}
              className={`appliance-items ${
                selectedItems.includes(item.id) ? "selected" : ""
              }`}
              onClick={() => handleItemClicked(item.id)}
              style={{
                backgroundColor: item.backgroundColor,
                borderColor: selectedItems.includes(item.id)
                  ? item.borderColor
                  : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <div style={{ fontWeight: "420", fontSize: "14px" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        onBack={() => navigate("/Food")}
        onNext={() => {
          if (selectedItems.length > 0) {
            navigate("/Electricity", { state: { selectedItems } });
          } else {
            alert("Please select an Item.");
          }
        }}
      />
    </div>
  );
}
