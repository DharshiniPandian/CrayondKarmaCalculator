import React from "react";
import { Route, Routes } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute";
import NotFound from "../pages/NotFound/NotFound";

function Router() {
  return (
    <Routes>
      <Route element={<ProtectedRoute stepRequired={1}><FrontPage /></ProtectedRoute>} path="/" />
      <Route element={<ProtectedRoute stepRequired={2}><VehiclePageOne /></ProtectedRoute>} path="/vehicle1"/>
      <Route element={<ProtectedRoute stepRequired={3}><VehiclePageTwo/></ProtectedRoute>} path="/vehicle2"/>
      <Route element={<ProtectedRoute stepRequired={4}><VehiclePageThree/></ProtectedRoute>} path="/vehicle3"/>
      <Route element={<ProtectedRoute stepRequired={5}><VehiclePageFour /></ProtectedRoute>} path="/vehicle4" />
      <Route element={<ProtectedRoute stepRequired={6}><Food /></ProtectedRoute>} path="/Food" />
      <Route element={<ProtectedRoute stepRequired={7}><Appliance /></ProtectedRoute>} path="/Appliance" />
      <Route element={<ProtectedRoute stepRequired={8}><Electricity /></ProtectedRoute>} path="/Electricity" />
      <Route element={<ProtectedRoute stepRequired={9}><Result /></ProtectedRoute>} path="/result" />
      <Route element={<ProtectedRoute stepRequired={10}><Form /></ProtectedRoute>} path="/tree-form" />
      <Route element={<ProtectedRoute stepRequired={11}><Complete /></ProtectedRoute>} path="/complete" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
