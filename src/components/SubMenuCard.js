import "./styles/submenus.css";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect, useState } from "react";
import me from "../media/my.png";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import { isMobile } from "react-device-detect";
import mySite from "./Domain";

// http://127.0.0.1:8000/api/cards/animales
const SubMenuCard = () => {
  const [categories, setCategories] = useState([]);
  const fetchData = () => {
    helpHttp()
      .get(`${mySite}categories`)
      .then((res) => setCategories(res));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      className="main-container-submenu"
      style={{
        height: isMobile ? "100%" : "100vh",
        // marginTop: isMobile ? "0px" : "80px",
      }}
    >
      <div className="container-sub-menus">
        <Link style={{ textDecoration: "none" }} to="/cards/mis-cartas">
          <div className="section mine">
            <h1 className="text-2xl">Mis cartas</h1>
            <img className="icon-sub-menu" src={me} alt="" />
          </div>
        </Link>
        {categories.categories &&
          categories.categories.map((category, key) => {
            return (
              <Link
                to={`/cards/${category.name}`}
                key={key}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="section"
                  style={{ backgroundImage: "url(" + category.bg_image + ")" }}
                >
                  <h1 className="category-title text-2xl">{category.name}</h1>
                  <img className="icon-sub-menu" src={category.icon} alt="" />
                </div>
              </Link>
            );
          })}
      </div>
      <MenuBar></MenuBar>
    </div>
  );
};

export default SubMenuCard;
