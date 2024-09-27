import React from "react";
import { Route, Routes } from "react-router-dom";
import Temp from "../pages/Temp";
import Temp2 from "../pages/Temp2";
import Result from "../pages/Result/Result";
import Form from "../pages/Forms/Form";
import Complete from "../pages/Result/Complete";
import Semi from "../pages/Result/chart";
import App from "../App";


function Router() {
  return (
    <Routes>
   
      <Route element={<Temp />} path="/temp" />
      <Route element={<Temp2 />} path="/temp2" />
      <Route element={<Result />} path="/result" />
      <Route element={<Form />} path="/tree-form" />
      <Route element={<Complete />} path="/complete" />
      <Route element={<Semi />} path="/chart" />
    </Routes>
  );
}

export default Router;
