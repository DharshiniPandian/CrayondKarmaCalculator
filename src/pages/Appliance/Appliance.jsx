import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsTriangleFill } from "react-icons/bs";
import "../../styles/Appliance.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { revertFoodType, selectApplianceType } from "../../slice/CalculationSlice";
import axios from "axios";
import Button from "../Button/Button";
import { addMasterAppliances } from "../../slice/MasterApiSlices";

export default function Appliance() {
  const [applianceId, setApplianceId] = useState([])
  const [applianceName, setApplianceName] = useState([])
  const [applianceValue, setApplianceValue] = useState(0)
  
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [CarbonValue, setCarbonValue] = useState(0);
  const [value, setValue] = useState(50);
  const applianceData = useSelector((s) => s.masterAppliances);
  // const globalCarbonValue = useSelector((s)=>s.carbonValue.total_emission.total_emission)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (value < 75) {
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
    {
      id: 4,
      borderColor: "#EF9BC5",
      backgroundColor: "#F9F5F7",
    },
    {
      id: 5,
      borderColor: "violet",
      backgroundColor: "#FCF5FF",
    },
    {
      id: 6,
      borderColor: "skyblue",
      backgroundColor: "#E4FBFF",
    },
    {
      id: 7,
      borderColor: "#EB7E74",
      backgroundColor: "#FFF4F3",
    },
  ];

  useEffect(() => {
    fetchmasterAppliances();
  }, []);

  const fetchmasterAppliances = async () => {
    try {
      const response = await axios.get("http://localhost:8081/master/appliances");
      if (response.status === 200) dispatch(addMasterAppliances(response.data));
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };

  const handleItemClicked = (itemId) => {
    setSelectedItems((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(itemId)) {
        newSelected = prevSelected.filter((id) => id !== itemId);
      } else {
        newSelected = [...prevSelected, itemId];
      }
      const newCarbonValue = newSelected.reduce((acc, id) => {
        const appliance = applianceData.find((product) => product.id === id);
        return acc + (appliance ? parseFloat(appliance.value) : 0);
      }, 0);
      // setCarbonValue(newCarbonValue);

      const newNames = newSelected.map((id) => {
        const appliance = applianceData.find((product) => product.id === id);
        return appliance ? appliance.name : "";
      });

      setApplianceName(newNames);
      setApplianceValue(newCarbonValue);
      setApplianceId(newSelected);
      
      return newSelected;
    });
  };

  const NextFunction = () => {
    if (selectedItems.length > 0) {
      navigate("/Electricity", { state: { selectedItems } });
      dispatch(selectApplianceType({ applianceId, applianceValue}))      
    } else {
      alert("Please select an Item.");
    }
  }

  // useEffect(() => {
    // console.log("Selected items:", selectedItems);
  // }, [selectedItems]);

  return (
    <div style={{ width: "100%", border: "1px solid #E8F2FF",height: "100%" }}>
      <div className="appliance-top">
        <div className="carbon-value">
          <BsTriangleFill style={{ color: "#DF2929", fontWeight: "550" }} />
          {applianceValue}ton CO2
        </div>
      </div>
      <div className="appliance-bottom">
      <div className="loader">
      <div style={{ width: 54, height: 54 }}>
              <CircularProgressbarWithChildren
                className="custom-progressbar"
                value={value}
                text={`3/4`}
                circleRatio={1}
                styles={buildStyles({
                  textSize: '30px',
          pathColor: '#FEA062',
          textColor: '#FEA062',
          trailColor: '#FFF4E4',
          backgroundColor: '#F39C12',
                })}
                strokeWidth={12}
              >
              </CircularProgressbarWithChildren>
            </div>
          </div>
        <div className="appliance-ques">
          Select the appliances you use at your home
        </div>
        <div style={{width: "91%",display: "flex",justifyContent: "center"}}>
        <div className="appliance-products">
          
          {applianceData.map((appliance, key) => (
            <div
              key={key}
              className={`appliance-items ${
                selectedItems.includes(appliance.id) ? "selected" : ""
              }`}
              onClick={() => handleItemClicked(appliance.id)}
              style={{
                backgroundColor: styles[key].backgroundColor,
                borderColor: selectedItems.includes(appliance.id)
                  ? styles[key].borderColor
                  : "transparent",
                borderWidth: "2px",
                borderStyle: "solid",
              }}
            >
              <div style={{ font:' normal normal normal 13px/16px Excon' }}>
                {appliance.name}
              </div>
            </div>
          ))}
          </div>
        </div>
      
      <div style={{marginTop:"11px"}}>
      <Button
      onBack={() => {dispatch(revertFoodType());
        navigate("/Food")}}
        onNext={NextFunction}
      />
      </div>
      </div>
    </div>
  );
}