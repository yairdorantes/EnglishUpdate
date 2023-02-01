import "./styles/leaderboard.css";
import first from "../media/first.png";
import second from "../media/second.png";
import third from "../media/third.png";
import usuario from "../media/user.png";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect } from "react";
import Loader from "./Loader";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./styles/shinytext.css";
import Modal from "react-modal";
import { isMobile } from "react-device-detect";
import mySite from "./Domain";
// import crossOut from "../media/crossout.png";

const customStyles = {
  content: {
    color: "white",
    width: isMobile ? "100%" : "500px",
    height: isMobile ? "62%" : "510px",
    border: "",
    outline: "none",
    borderRadius: "15px",
    left: "50%",
    top: "10%",
    transform: "translate(-50%)",
    backgroundColor: "#00000000",

    // top: "10px",
    transition: "2s ease-in-out",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const LeaderBoard = ({ isBoard, hideLeaderboard }) => {
  let { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [tops, setTops] = useState([]);
  const getTop = () => {
    helpHttp()
      .get(`${mySite}topusers/`)
      .then((res) => {
        setTops(res.topuser);
      });
    helpHttp()
      .get(`${mySite}users/${user.user_id}`)
      .then((res) => {
        setUserData(res.user);
        console.log(res);
        console.log(res.user.score);
      });
  };

  useEffect(() => {
    getTop();
  }, []);

  return (
    <>
      <Modal ariaHideApp={false} style={customStyles} isOpen={isBoard}>
        <OutsideClickHandler
          onOutsideClick={() => {
            hideLeaderboard();
          }}
        >
          {/* <img
            onClick={() => {
              hideLeaderboard();
              console.log("clickado");
            }}
            src={crossOut}
            alt=""
            className="tache-leader"
          /> */}
          <div
            className={
              isBoard
                ? "container-leader-board"
                : "container-leader-board hide-leaderboard "
            }
          >
            <fieldset
              className={
                isMobile ? "fieldset-leader leader-mobile" : "fieldset-leader"
              }
            >
              <legend>
                <h2 className="leader-title">XP más altos</h2>
              </legend>
              <div className="container-content-leader">
                <div className="container-legend-leader">
                  <div>Posición</div>
                  <div>Usuario</div>
                  <div>XP</div>
                </div>
                {!tops ? (
                  <Loader></Loader>
                ) : (
                  tops.map((top, key) => {
                    return (
                      <div key={key} className="container-place-icons">
                        <div className="container-place-user">
                          <div>
                            <img
                              className="place-icon"
                              src={
                                (key === 0 && first) ||
                                (key === 1 && second) ||
                                (key === 2 && third)
                              }
                              alt=""
                            />
                          </div>
                          <div className="icon-username">
                            <div>
                              <img
                                className="user-icon-leader"
                                src={usuario}
                                alt=""
                              />
                              <div
                                className={
                                  top.premium === true ? "shiny-text" : ""
                                }
                              >
                                <div className="max-w-[50px]">
                                  {top.username}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>{top.score}</div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div className="your-score-board">
                  Tu XP: {userData && userData.score}
                </div>
              </div>
            </fieldset>
          </div>
        </OutsideClickHandler>
      </Modal>
    </>
  );
};

export default LeaderBoard;
