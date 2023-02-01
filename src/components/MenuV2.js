import React from "react";
import "./styles/menuv2.css";
import cards from "../media/cardss.png";
import tips from "../media/blog.png";
import LeaderBoard from "./LeaderBoard";
import { Link } from "react-router-dom";
import { useState } from "react";
import trofeo from "../media/ganador.png";
import { isMobile } from "react-device-detect";

// console.log("xs");
const MenuV2 = () => {
  const [isBoard, setIsBoard] = useState(false);
  const hideLeaderboard = () => {
    setIsBoard(false);
  };
  const handleLeaderboard = () => {
    setIsBoard(true);
  };
  return (
    <>
      <div
        className={isMobile ? "container-menus box-mobile" : "container-menus"}
      >
        <div
          onClick={handleLeaderboard}
          className={isMobile ? "menu-option one mobile" : "menu-option one"}
        >
          <div className="container-img-txt">
            <img src={trofeo} alt="" />

            <LeaderBoard
              hideLeaderboard={hideLeaderboard}
              isBoard={isBoard}
            ></LeaderBoard>
            <h1 className="text-5xl">Puntajes</h1>
          </div>
        </div>

        <Link to="/cards" className="link-menu">
          <div
            className={isMobile ? "menu-option two mobile" : "menu-option two"}
          >
            <div className="container-img-txt">
              <img src={cards} alt="" />
              <h1 className="text-5xl">Cartas</h1>
            </div>
          </div>
        </Link>
        <Link to="/posts" className="link-menu">
          <div
            className={
              isMobile ? "menu-option three mobile" : "menu-option three"
            }
          >
            <div className="container-img-txt">
              <img src={tips} alt="" />
              <h1 className="text-5xl">blog</h1>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default MenuV2;
