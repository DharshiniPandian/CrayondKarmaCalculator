import React from "react";
import { Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";
import Temp2 from "../pages/Temp2";
import Result from "../pages/Result/Result";
import Form from "../pages/Forms/Form";
import Complete from "../pages/Result/Complete";
// import Semi from "../pages/Result/chart";
import Food from "../pages/Food/Food";
import Appliance from "../pages/Appliance/Appliance";
import Electricity from "../pages/Electricity/Electricity";
import App from "../App";
import FrontPage from "../pages/frontpage/FrontPage";
import VehiclePageOne from "../pages/vehicle/VehiclePageOne";
import VehiclePageTwo from "../pages/vehicle/VehiclePageTwo";
import VehiclePageThree from "../pages/vehicle/VehiclePageThree";
import VehiclePageFour from "../pages/vehicle/VehiclePageFour";

function Router() {
  return (
    <Routes>
      <Route element={<Temp />} path="/temp" />
      <Route element={<Temp2 />} path="/temp2" />
      <Route element={<Result />} path="/result" />
      <Route element={<Form />} path="/tree-form" />
      <Route element={<Complete />} path="/complete" />
      {/* <Route element={<Semi />} path="/chart" /> */}
      <Route element={<FrontPage/>} path="/"/>
      <Route element={<Food />} path="/Food" />
      <Route element={<Appliance />} path="/Appliance" />
      <Route element={<Electricity />} path="/Electricity" />
      <Route element={<FrontPage />} path="/" />
      <Route element={<VehiclePageOne />} path="/vehicle1"/>
      <Route element={<VehiclePageTwo/>} path="/vehicle2"/>
      <Route element={<VehiclePageThree/>} path="/vehicle3"/>
      <Route element={<VehiclePageFour />} path="/vehicle4" />
    </Routes>
  );
}

export default Router;
