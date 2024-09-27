import React from "react";
import Router from "./router/router";

function App() {
 

   return (
      <>
        <style>
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body, html {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
  
            .container {
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #f8f8f8;
              height: 100vh;
              width: 100%;
            }
  
            .red-field {
              background-color: red;
              width: 375px;
              height: 100vh; 
              font-size: 24px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); 
            }
  
            @media (max-width: 600px) {
              .red-field {
                width: 100vw;
                height: 100vh;
                border-radius: 0; 
              }
            }
          `}
        </style>
  
        <div className="container">
          <div >
            <Router />
          </div>
        </div>
      </>
    );
  }

export default App