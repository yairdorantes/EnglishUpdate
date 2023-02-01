import { NavLink /* useNavigate*/ } from "react-router-dom";
import "./styles/menuBar.css";
import cards from "../media/cardss.png";
import tips from "../media/blog.png";
import menus from "../media/casa.png";
// import back from "../media/undo.png";
import AboutUser from "./AboutUser";
const MenuBar = ({ wasUp }) => {
  // const navigate = useNavigate();

  return (
    <div className="container-menu-bar">
      <div className="container-menus-bar">
        <div className="link-my-menu ">
          <NavLink
            className="bigger"
            to="/"
            style={{ filter: "brightness(63%)", width: "100px" }}
          >
            <img
              className={"icon-menu-bar"}
              icon-name="menu"
              src={menus}
              alt=""
            />
          </NavLink>
        </div>
        <div className="link-my-menu ">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    filter: "brightness(100%)",
                  }
                : { filter: "brightness(45%)" }
            }
            className="link-element"
            to="/cards"
          >
            <img
              icon-name="cards"
              className="icon-menu-bar w-full"
              src={cards}
              alt=""
            />
          </NavLink>
        </div>

        <div className="link-my-menu ">
          <NavLink
            style={({ isActive }) =>
              isActive
                ? {
                    filter: "brightness(100%)",
                  }
                : { filter: "brightness(45%)" }
            }
            className="link-element"
            to="/posts"
          >
            <img
              icon-name="blog"
              className={"icon-menu-bar"}
              src={tips}
              alt=""
            />
          </NavLink>
        </div>
        {/* <div className="link-my-menu">
          <div onClick={() => navigate(-1)}>
            <img
              style={{ filter: "brightness(70%)" }}
              className={"icon-menu-bar"}
              icon-name="menu"
              src={back}
              alt=""
            />
          </div>
        </div> */}
        <div className="link-my-menu ">
          <NavLink>
            <AboutUser wasUp={wasUp}></AboutUser>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
