import { useState } from "react";
import "./styles/formCard.css";
import { helpHttp } from "../helpers/helpHttp";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ReactFileReader from "react-file-reader";
import Modal from "react-modal";
import crossOut from "../media/crossout.png";
import OutsideClickHandler from "react-outside-click-handler";
import { useEffect } from "react";
import mySite from "./Domain";
import Loader from "./Loader";

const url = `${mySite}cards/`;

const customStyles = {
  content: {
    // color: "white",
    width: "350px",
    height: "350px",
    backgroundColor: "#00000000",
    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "#18191ab1" },
};
const FormCard = ({ modalIsOpen, openModal, fetchApi, cardData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [optionSelected, setOptionSelected] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [checkUrl, setCheckUrl] = useState(false);
  const [checkFile, setCheckFile] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(true);
  let { user } = useContext(AuthContext);

  let initialForm;
  if (cardData) {
    initialForm = {
      user: user.user_id,
      title: cardData.cardTitle,
      meaning: cardData.cardMeaning,

      file: cardData.cardImage,
      img_url: cardData.imageURL,
    };
  } else {
    initialForm = {
      user: user.user_id,
      title: "",
      meaning: "",
      file: "",
      img_url: "",
    };
  }
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (cardData) {
      if (cardData.imageURL.length > 0) {
        setOptionSelected("url");
        setCheckUrl(true);
      }
      if (cardData.cardImage.length > 0) {
        setOptionSelected("file");
        setFileSelected(true);
        setCheckFile(true);
      }
      setForm({
        user: user.user_id,
        title: cardData.cardTitle,
        meaning: cardData.cardMeaning,
        file: cardData.cardImage,
        img_url: cardData.imageURL,
      });
    }
    // console.log(cardData.imageURL);
    console.log(form);
  }, [cardData]);

  const createData = (data) => {
    console.log(form);
    // if (!form.title === "" || !form.meaning === "" || !form.file === "") {
    if (
      form.title === "" ||
      form.meaning === "" ||
      (form.file === "" && form.img_url === "")
    ) {
      alert("llena todos los campos por favor");
    } else if (form.title.length > 23 || form.meaning.length > 23) {
      alert("demasiado larga UwU");
    } else {
      let options = {
        body: data,
        headers: { "content-type": "multipart/form-data" },
      };
      console.log(options);

      if (cardData) {
        let urlEditCard = `${mySite}card-edit/${cardData.id}`;

        setIsLoading(true);
        helpHttp()
          .put(urlEditCard, options)
          .then((res) => {
            res.err ? setMessage(true) : setMessage(false);
            fetchApi();
          });
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setShowBtn(false);
        helpHttp()
          .post(url, options)
          .then((res) => {
            res.err ? setMessage(true) : setMessage(false);
            fetchApi();
          });
        setIsLoading(false);

        setForm(initialForm);
        setOptionSelected("");
      }
      !message && openModal();
      setShowBtn(true);
    }
    // } else {
    //   alert("llena");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.taget);
    console.log(form);

    createData(form);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hideFormCard = () => {
    openModal();
    setMessage(false);
    setOptionSelected("");
    setFileSelected(false);
    setCheckUrl(false);
    setCheckFile(false);
  };
  const handleFiles = (file) => {
    file && setFileSelected(true);
    setForm({
      ...form,
      ["file"]: file.base64,
    });
  };

  const handleChangeRadio = (e) => {
    setOptionSelected(e.target.value);
    if (e.target.value === "url") {
      setFileSelected(false);
    }
    // console.log(optionSelected);
    console.log(fileSelected);
  };

  useEffect(() => {
    if (optionSelected === "url") {
      setForm({
        ...form,
        ["file"]: "",
      });
      // setFileSelected(false);
      console.log(form);
    }
    if (optionSelected === "file") {
      setForm({
        ...form,
        ["img_url"]: "",
      });
      // setFileSelected(true);
    }
  }, [optionSelected]);

  return (
    <Modal
      className="modal-form-card"
      ariaHideApp={false}
      style={customStyles}
      isOpen={modalIsOpen}
      // contentLabel="Minimal Modal Example"
    >
      <OutsideClickHandler
        onOutsideClick={() => {
          hideFormCard();
        }}
      >
        <img
          style={{ margin: "10px" }}
          className="cross-out"
          onClick={openModal}
          src={crossOut}
          alt=""
        />
        <div className="container-form-card">
          <div className="form-card">
            <div>
              <h3>{cardData ? "Edita tu carta" : "¡Sube tus cartas!"}</h3>
            </div>
            <div>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-form-card"
                type="text"
                placeholder="Palabra en ingles"
              />
            </div>
            <div>
              <input
                name="meaning"
                value={form.meaning}
                onChange={handleChange}
                className="input-form-card"
                type="text"
                placeholder="signicado"
              />
            </div>
            <h2></h2>
            <br />
            <div>
              Enviar imagen en:
              <br />
              <label htmlFor="file">Archivo </label>
              <input
                onChange={handleChangeRadio}
                id="file"
                name="btn-radio"
                type="radio"
                value="file"
                checked={checkFile}
                onClick={() => {
                  setCheckUrl(false);
                  setCheckFile(true);
                }}

                // checked
                // checked={cardData.cardImage.length > 0 && true}
              />
              <br />
              <label htmlFor="url">Url</label>
              <input
                checked={checkUrl}
                onChange={handleChangeRadio}
                id="url"
                name="btn-radio"
                type="radio"
                value="url"
                onClick={() => {
                  setCheckFile(false);
                  setCheckUrl(true);
                }}

                // checked={cardData.imageURL.length > 0 && true}
              />
            </div>
            <div></div>
            {optionSelected === "file" ? (
              <div className="main_div">
                <ReactFileReader handleFiles={handleFiles} base64={true}>
                  <button>
                    {fileSelected
                      ? "Archivo seleccionado ✅"
                      : "Selecciona imagen"}
                  </button>
                </ReactFileReader>
              </div>
            ) : (
              optionSelected === "url" && (
                <div>
                  <input
                    name="img_url"
                    value={form.img_url}
                    onChange={handleChange}
                    className="input-form-card"
                    type="text"
                    placeholder="Dirección de la imagen"
                  />
                  <span
                    onClick={() => {
                      setForm({ ...form, ["img_url"]: "" });
                    }}
                    className="btn btn-sm rounded-full absolute ml-2 mt-2"
                  >
                    ×
                  </span>
                </div>
              )
            )}
            <div>
              <button
                onClick={handleSubmit}
                type="submit"
                className={showBtn ? "btn-send-card" : "hide-btn-send-card"}
              >
                Enviar
              </button>
            </div>
            {isLoading && <Loader />}
          </div>
        </div>
        {message && (
          <div style={{ textAlign: "center", color: "red" }}>
            ups Algo salio mal, intentalo de nuevo
          </div>
        )}
      </OutsideClickHandler>
    </Modal>
  );
};

export default FormCard;
