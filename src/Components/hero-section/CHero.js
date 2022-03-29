import React from "react";
import { Navbar } from "../nav links/CNav";
import "./CHero.css";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <>
    {/* <Navbar/> */}
    <div className="d-flex flex-column gap-3 container">
      <div className="d-flex align-items-center fullscreen mt-4">
        <div className="d-flex flex-column align-items-start gap-5 mt-3">
          <p className="introText">
            SELL AND BUY CROPS IN INDIAN MANDI AT <br />{" "}
            <span className="highlight">BEST PRICE</span>
          </p>
          <button
            className="btn btn-lg fw-bold text-uppercase ctaButton"
            type="submit"
            >
            <Link to="/flogin" className="joinbtn">JOIN US</Link>
          </button>
        </div>
      </div>
    </div>
            </>
  );
};