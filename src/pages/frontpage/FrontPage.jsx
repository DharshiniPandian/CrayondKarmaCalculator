import React from "react";
import "./front.css";
import { Button, Typography } from "@mui/material";
import pg1 from "../../assets/brain.png";
import pg2 from "../../assets/footprint.png";
import pg3 from "../../assets/tree.png";
import { useNavigate } from "react-router-dom";
import { goToNextStep } from "../../slice/UserSlice";
import { useDispatch } from "react-redux";

const FrontPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="frontPageMain">
      <div className="topImg">
        <div className="FrontTitle">
            Know & offset your carbon footprints!
        </div>
      </div>
      <div className="optionsDiv">
        <div className="options123">
          <div className="optionPart">
            <div className="image" style={{backgroundColor:"#FFF5F3"}}>
              <img src={pg1} alt="" width={50} />
            </div>
            <div>
              <p className="optionTitle">Answer Our Questions</p>
              <p
                className="p2"
              >
                estibulum venenatis fringilla lorem eu finibus. Donec ac nulla nec nunc malesuada euismod et vitae ipsum. 
              </p>
            </div>
          </div>
          <div className="optionPart">
            <div className="image" style={{backgroundColor:"#FFF7E8"}}>
              <img src={pg2} alt="" width={50} />
            </div>
            <div>
              <p className="optionTitle">Know your carbon footprint</p>
              <p
                className="p2"
              >
                estibulum venenatis fringilla lorem eu finibus. Donec ac nulla nec nunc malesuada euismod et vitae ipsum.
              </p>
            </div>
          </div>
          <div className="optionPart">
            <div className="image" style={{backgroundColor:"#E2F1E6"}}>
              <img src={pg3} alt="" width={50} />
            </div>
            <div>
              <p className="optionTitle">Offset it by following instructions</p>
              <p
                className="p2"
              >
                estibulum venenatis fringilla lorem eu finibus. Donec ac nulla nec nunc malesuada euismod et vitae ipsum.
              </p>
            </div>
          </div>
        </div>
        <div className="buttonsDiv">
          <div>
          <Button
            variant="outlined"
            sx={{ 
            textTransform: "none", 
            backgroundColor:"#E6EEFA",
            borderColor:"#E6EEFA",
            borderRadius:"10px",
            font: "normal normal 700 14px/16px Sarabun",
            width: "143px",
            height: "48px"
            }}
          >
            Later
          </Button>
          </div>
          <div>
          <Button
            variant="outlined"
            sx={{ 
              textTransform: "none",
              backgroundColor:"#0E70EB",
              borderColor:"#0E70EB",
              color:"white",
              font: "normal normal 500 13px/16px Sarabun",
              width: "143px",
              height: "48px",
              borderRadius:"8px"
            }}
            onClick={() => {
              dispatch(goToNextStep());
              navigate("/vehicle1")
            }}
          >
            Calculate & offset
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;