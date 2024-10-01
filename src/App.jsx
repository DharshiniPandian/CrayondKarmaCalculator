import React from "react";
import Router from "./router/router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NotFound from "./pages/NotFound/NotFound";

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
              height: 100vh;
              width: 100%;
            }
  
            .red-field {
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
          <div className="red-field">
            <Provider store={store}>
            <Router />
            </Provider>
          </div>
        </div>
      </> 
    );
  }

export default App