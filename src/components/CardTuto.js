import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import videoIntro from "../media/videos/video.mp4";
import crossOut from "../media/crossout.png";
import "./styles/styleModalTuto.css";
const customStyles = {
  content: {
    color: "white",
    width: "300px",
    height: "450px",
    backgroundColor: "#16181Cef",
    marginLeft: "-20px",
  },
  overlay: { zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0)" },
};

const CardTuto = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (e) => {
    // e.preventDefault();
    modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true);
  };
  return (
    <div>
      <button className="btn-tuto" onClick={openModal}>
        Video Introduccion
      </button>
      <Modal ariaHideApp={false} style={customStyles} isOpen={modalIsOpen}>
        <img className="cross-out" onClick={openModal} src={crossOut} alt="" />
        <video
          autoPlay
          style={{ height: "90%", width: "100%" }}
          controls
          src={videoIntro}
        ></video>
      </Modal>
    </div>
  );
};

export default CardTuto;
