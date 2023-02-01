import "./styles/modalStyles.css";
import usuario from "../media/user.png";
import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import PayPal from "./PayPal";
import closeUser from "../media/logout.png";
import vip from "../media/vip.png";
import crossOut from "../media/crossout.png";
import OutsideClickHandler from "react-outside-click-handler";
import "./styles/shinytext.css";
import mySite from "./Domain";
// Modal.defaultStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.83)";
const customStyles = {
  content: {
    color: "white",
    width: "270px",
    height: "450px",
    backgroundColor: "black",
    border: "solid 1px #040615",
    outline: "none",
    borderRadius: "15px",
    left: "99.9%",
    // top: "40%",

    transform: "translate(-100%,-8%)",
    // top: "10px",
    transition: "2s ease-in-out",
  },
  overlay: { zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0)" },
};

const AboutUser = ({ wasUp }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let { user, logoutUser } = useContext(AuthContext);
  const [scoreUser, setScoreUser] = useState();
  const [isPremium, setIsPremium] = useState(false);
  let url = `${mySite}users/${user.user_id}`;
  const hideAboutUser = () => {
    setModalIsOpen(false);
  };
  // const ref = useDetectClickOutside({ onTriggered: hideAboutUser });

  const getuser = () => {
    console.log("loli");
    helpHttp()
      .get(url)
      .then((res) => {
        setIsPremium(res.user.premium);
        // console.log(isPremium);
        setScoreUser(res.user.score);
      });
  };

  useEffect(() => {
    getuser();
  }, []);
  useEffect(() => {
    wasUp && getuser();
  }, [wasUp]);

  const openModal = (e) => {
    // e.preventDefault();
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };

  return (
    <>
      <img
        style={{
          filter: modalIsOpen ? "brightness(100%)" : "brightness(45%)",
        }}
        className="icon-menu-bar"
        onClick={openModal}
        src={usuario}
        alt=""
      />
      <Modal
        ariaHideApp={false}
        style={customStyles}
        isOpen={modalIsOpen}
        contentLabel="Minimal Modal Example"
      >
        <OutsideClickHandler
          onOutsideClick={() => {
            hideAboutUser();
          }}
        >
          <img
            className="cross-out"
            onClick={openModal}
            src={crossOut}
            alt=""
          />

          <div className="container-info-inside-modal">
            <div>
              <h2 className="textito">
                ¡Bienvenido{" "}
                <span className={isPremium ? "shiny-text" : ""}>
                  {/* {console.log(isPremium)} */}
                  {user.username}
                </span>
                !
              </h2>
              <h4 style={{ textAlign: "center", marginTop: "10px" }}>
                {scoreUser} XP
              </h4>
            </div>

            <div className="user-is-vip">
              <img className="vip-icon" src={vip} alt="" />
              <span>
                <strong>
                  {isPremium
                    ? "Eres usuario premium 😃!"
                    : "Todavia no eres usuario premium ☹️ (puedes serlo pagando aqui⬇)"}
                  {!isPremium && <PayPal></PayPal>}
                </strong>
              </span>
            </div>
            {/* <button class="button-pro">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
              </svg>
              Unlock Pro
            </button> */}

            <div className="icon-text-modal-logout" onClick={logoutUser}>
              <img className="logout-icon" src={closeUser} alt="" />
              <span className="logout-text">Cerrar sesión</span>
            </div>
          </div>
        </OutsideClickHandler>
      </Modal>
    </>
  );
};

export default AboutUser;
