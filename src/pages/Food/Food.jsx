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
import axios from "axios";
import { useDispatch } from "react-redux";
import { addMasterFoodsData } from "../../slice/MasterApiSlices";
import { revertTravelDistance } from "../../slice/CalculationSlice";

export default function Food() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [CarbonValue, setCarbonValue] = useState(0);
  const [FoodId, setFoodId] = useState(0)
  const [FoodValue, setFoodValue] = useState(0)
  const [FoodName, setFoodName] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleItemClicked = (item) => {
    setFoodName(item.name)
    setFoodId(item.id)
    setFoodValue(Number(item.carbon))
    
    // const selectedItem = FoodProducts.find((item) => item.id === item.id);

    // setSelectedItem((prevSelected) =>
    //   prevSelected === item.id ? null : item.id
    // );

    // setCarbonValue((prevSelected) =>
    //   prevSelected === item.id ? "" : selectedItem?.carbon
    // );

    console.log("Food Name =", FoodName,);
    console.log("Food ID =", FoodId,);
    console.log("Food Value =", FoodValue,);
  };

  const NextFunction = () => {
    dispatch(selectFoodType({FoodId, FoodValue}))
  }

  useEffect(() => {
    fetchmasterFoodItems()
  }, []);

  const fetchmasterFoodItems = async () => {
    try{
      const response = await axios.get('http://localhost:8081/master/foods');
      if(response.status===200)
      dispatch(addMasterFoodsData(response.data))
    }
    catch(error){
      console.log("error while fetching data",error);
    }
  }

  return (
    <div>
      <div className="food-top">
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {CarbonValue}ton CO2
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
          {FoodProducts.map((item, key) => (
            <div
              key={key}
              className={`food-items ${
                FoodNam === item.id ? "selected" : ""
              }`}
              onClick={() => handleItemClicked(item)}
              style={{
                backgroundColor: item.backgroundColor,
                borderColor:
                  FoodId === item.name ? item.borderColor : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <img
                src={item.img}
                style={{ width: "35px", height: "35px" }}
                alt={item.name}
              />
              <div
                style={{
                  fontWeight: "420",
                  fontSize: "13px",
                  fontFamily: "Excon, sans-serif",
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="foodStaticBtn">
      <Button
        onBack={() =>
        {dispatch(revertTravelDistance()),navigate("/Vehicle4", { state: { activepage: "pagefour" } })}
        } // Changed to 'activepage'
        onNext={() => {
          if (selectedItem) {
            navigate("/Appliance", { state: { selectedItem } });
            onclick={NextFunction}
          } else {
            alert("Please select an Item.");
          }
        }}
      />
      </div>
    </div>
  );
}
