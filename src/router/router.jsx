import React from "react";
import { Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";
import Temp2 from "../pages/Temp2";
import App from "../App";


function Router() {
  return (
    <Routes>
   
      <Route element={<Temp />} path="/temp" />
      <Route element={<Temp2 />} path="/temp2" />
    </Routes>
  );
}

export default Router;
