import React from "react";
import { useSelector } from "react-redux";
import bad from "../assets/background.svg";
import good from "../assets/bg1.png";

const ReportBackground = () => {
  const globalCarbonValue = useSelector(
    (s) => s.carbonValue.total_emission.total_emission
  );
  if(globalCarbonValue<16.00){
    return good
  }
  else{
    return bad
  }
};

export default ReportBackground;
