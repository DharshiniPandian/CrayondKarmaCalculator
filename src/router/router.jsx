import React from "react";
import { Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";
import Temp2 from "../pages/Temp2";
import App from "../App";
import FrontPage from "../pages/frontpage/FrontPage";


function Router() {
  return (
    <Routes>
      <Route element={<Temp />} path="/temp" />
      <Route element={<Temp2 />} path="/temp2" />
      <Route element={<FrontPage/>} path="/frontpage"/>
    </Routes>
  );
}

export default Router;
