import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { FaPizzaSlice } from "react-icons/fa";
import OrderForm from "./OrderForm";
import "./App.css";
import Homepage from "./Homepage";

const App = () => {
  return (
    <Router>
      <>
        <div className="container">
          <div className="header">
            <h1>
              {" "}
              <FaPizzaSlice style={{ color: "tomato" }} />{" "}
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Pizza DOT
              </Link>
            </h1>
          </div>

          <div>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "tomato",
                padding: "10px",
                borderRadius: "10px",
                marginRight: "10px",
                fontWeight: "bold",
                letterSpacing: "1.2px",
              }}
            >
              Homepage
            </Link>

            <Link
              id="order-pizza"
              to="/pizza"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "tomato",
                padding: "10px",
                borderRadius: "10px",
                fontWeight: "bold",
                letterSpacing: "1.2px",
              }}
            >
              Order Form
            </Link>
          </div>
        </div>

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/pizza" component={OrderForm} />
        </Switch>
      </>
    </Router>
  );
};
export default App;
