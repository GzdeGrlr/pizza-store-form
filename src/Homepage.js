import React from "react";
import Pizza from "./PizzaOne.jpg";
import styled from "styled-components";
import { CiPizza } from "react-icons/ci";
import { FcFlashOn } from "react-icons/fc";
import { HiHeart } from "react-icons/hi";
import { Link } from "react-router-dom";

const Button = styled.button`
  width: 250px;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  --b: 3px; /* border thickness */
  --s: 0.45em; /* size of the corner */
  --color: #373b44;
  padding: calc(0.5em + var(--s)) calc(0.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background: conic-gradient(
      from 90deg at var(--b) var(--b),
      #0000 90deg,
      var(--color) 0
    )
    var(--_p) var(--_p) / calc(100% - var(--b) - 2 * var(--_p))
    calc(100% - var(--b) - 2 * var(--_p));
  transition: 0.4s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: 0.6em;
  font-size: 20px;
  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover,
  &:focus-visible {
    --_p: 0px;
    outline-color: var(--color);
    outline-offset: 0.05em;
  }

  &:active {
    background: var(--color);
    color: #fff;
  }
`;

function Homepage() {
  return (
    <div>
      <div className="home-container">
        <div
          style={{
            backgroundColor: "white",
            height: "620px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 20px",
            letterSpacing: "1.3px",
          }}
        >
          <h1>
            True Italian <i>Taste</i>. <CiPizza /> Prepared at the speed of{" "}
            <i>flash</i>. <FcFlashOn />
          </h1>

          <p>
            Delicios thin crust pizza, flavour-packed starters and exquisite
            cocktails. Preparing the passion and truly Italian taste right into
            your heart.{" "}
            <HiHeart
              style={{
                color: "red",
              }}
            />
          </p>
          <br />
          <Button as={Link} to="/pizza">
            Order Now!
          </Button>
        </div>
        <div>
          <img src={Pizza} className="main-img" alt="PizzaPhoto"></img>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
