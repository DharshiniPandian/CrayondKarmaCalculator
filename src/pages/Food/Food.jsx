import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";
import Greens from "../../assets/LeafyGreen.png";
import Oden from "../../assets/Oden.png";
import PoultryLeg from "../../assets/PoultryLeg.png";
import "../../styles/Food.css";
import Button from "../Button/Button";
import ChangingProgressProvider from "../Loader/ChangingProgressProvider";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Food() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [CarbonValue, setCarbonValue] = useState(0);
  const navigate = useNavigate();

  const [value, setValue] = useState(25);

  useEffect(() => {
    let timer;
    if (value < 50) {
      timer = setTimeout(() => setValue(value + 1), 20);
    }
    return () => clearTimeout(timer);
  }, [value]);

  const FoodProducts = [
    {
      id: 1,
      name: "Veg",
      img: Greens,
      borderColor: "#3ea957",
      backgroundColor: "#E4FFEE",
      carbon: "17.5",
    },
    {
      id: 2,
      name: "Both",
      img: Oden,
      borderColor: "#FFBA63",
      backgroundColor: "#FFF4E6",
      carbon: "18.5",
    },
    {
      id: 3,
      name: "Non veg",
      img: PoultryLeg,
      borderColor: "#EB7E74",
      backgroundColor: "#FFF4F3",
      carbon: "19.5",
    },
  ];

  const handleItemClicked = (itemId) => {
    const selectedItem = FoodProducts.find((item) => item.id === itemId);

    setSelectedItem((prevSelected) =>
      prevSelected === itemId ? null : itemId
    );

    setCarbonValue((prevSelected) =>
      prevSelected === itemId ? "" : selectedItem?.carbon
    );

    console.log("Carbon value =", CarbonValue);
  };

  useEffect(() => {
    console.log("Selected item:", selectedItem);
  }, [selectedItem]);

  return (
    <div>
      <div className="food-top">
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
                  circleRatio: 1 / 2,
                  pathTransitionDuration: 0.5,
                  strokeWidth: 20,
                  rotation: 0,
                  trailColor: "#FFF4E4",
                  pathColor: "#FEA062",
                })}
              >
                <div className="rotation-value">2/4</div>
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
      <div className="food-bottom">
        <div className="food-ques">What do you normally eat?</div>
        <div className="food-products">
          {FoodProducts.map((item) => (
            <div
              key={item.id}
              className={`food-items ${
                selectedItem === item.id ? "selected" : ""
              }`}
              onClick={() => handleItemClicked(item.id)}
              style={{
                backgroundColor: item.backgroundColor,
                borderColor:
                  selectedItem === item.id
                    ? item.borderColor
                    : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <img
                src={item.img}
                style={{ width: "40px" }}
                alt={item.name}
              />
              <div style={{ fontWeight: "420", fontSize: "14px" }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
  onBack={() => navigate("/Vehicle", { state: { activepage: "pagefour" } })} // Changed to 'activepage'
  onNext={() => {
    if (selectedItem) {
      navigate("/Appliance", { state: { selectedItem } });
    } else {
      alert("Please select an Item.");
    }
  }}
/>
    </div>
  );
}
