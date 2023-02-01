import React, { useContext, useEffect, useRef, useState } from "react";
import "./styles/cardStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles/stylesCards.css";
import { Pagination, EffectCards, Mousewheel, Keyboard } from "swiper";
import wordSound from "../media/cards/audio.png";
import iconAdd from "../media/add.png";
import Loader from "./Loader";
import MenuBar from "./MenuBar";
import { Link, NavLink, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import FormCard from "./FormCard";
import PayPal from "./PayPal";
import { helpHttp } from "../helpers/helpHttp";
import Modal from "react-modal";
import OutsideClickHandler from "react-outside-click-handler";
import next from "../media/next3.png";
import mySite from "./Domain";
import { isMobile } from "react-device-detect";
import AWS from "aws-sdk";
import axios from "axios";
import Phrases from "./Phrases";
// import CardTuto from "./CardTuto";

let url = "";
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const Cards = () => {
  let { user } = useContext(AuthContext);
  // console.log(user.user_id);

  let urlIncreaseScore = `${mySite}increase/${user.user_id}`;
  const audioRef = useRef();

  const paramsUrl = useParams();
  const [audio, setAudio] = useState();

  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [cards, setCards] = useState([]);
  const [answerSelected, setAnswerSelected] = useState();
  const [cardPicked, setCardPicked] = useState();
  const [modalQuestion, setModalQuestion] = useState(false);
  const [result, setResult] = useState();
  const [answers, setAnswers] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [mode, setMode] = useState(true);
  const [checked, setChecked] = useState();
  const [loader, setLoader] = useState(false);
  const polly = new AWS.Polly({
    region: "us-east-1",
    accessKeyId: "AKIAU2DSU7LYS7FGQID2",
    secretAccessKey: "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",
  });

  const customStyles = {
    content: {
      // color: "black",
      width: isMobile ? "84vw" : "320px",
      height: "440px",
      backgroundColor: mode ? "white" : "black",
      top: isMobile ? "50%" : "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "solid 1px #270969",
      // backgroundColor: "#00000000",
      outline: "none",
      transition: "1s ease-in-out",
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Mulish, sans-serif",

      // padding: "0",
    },
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.9)" },
  };

  const fetchAPi = async () => {
    setLoader(true);
    paramsUrl.section === "mis-cartas"
      ? (url = `${mySite}usercards/${user.user_id}`)
      : (url = `${mySite}cards/${paramsUrl.section}`);
    axios.get(url).then((res) => {
      setCards(res.data);
      setLoader(false);
    });
  };

  const getUserData = () => {
    helpHttp()
      .get(`${mySite}users/${user.user_id}`)
      .then((res) => {
        // console.log(res.user.premium);
        setIsPremium(res.user.premium);
      });
  };

  useEffect(() => {
    fetchAPi();
    getUserData();
  }, []);

  const handleDisplay = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);
  };
  const hideQuestion = () => {
    setModalQuestion(false);
    setResult();
    setIsSent(false);
  };

  const openModal = (e) => {
    setModalIsOpen(!modalIsOpen);
  };

  function differentRandom() {
    var randoms = [];
    while (randoms.length < 3) {
      var r = Math.floor(Math.random() * cards.cards.length - 1) + 1;
      if (randoms.indexOf(r) === -1) randoms.push(r);
    }
    return randoms;
  }

  const generateQuestion = () => {
    setChecked(-1);

    const lista = [];
    const cartas = cards.cards;
    if (cards.cards) {
      if (cartas.length < 4) {
        hideQuestion();
        alert("Necesitas agregar almenos 4 cartas para generar un Quiz");
      } else {
        const randomsGenerated = differentRandom();
        const cardChoosen = cartas[randomsGenerated[0]];
        lista.push(cardChoosen);
        setCardPicked(cardChoosen);
        const answerOne = cartas[randomsGenerated[1]];
        lista.push(answerOne);
        const answerTwo = cartas[randomsGenerated[2]];
        lista.push(answerTwo);
        setAnswers(lista.sort(() => Math.random() - 0.5));
      }
    } else {
      alert("Agrega más cartas 4 cartas para generar un Quiz");
    }
  };

  const handleChangeRadio = (e) => {
    setAnswerSelected(e.target.value);
    console.log(e.target.id);
    setChecked(e.target.id);
  };
  const handleAnswer = () => {
    setIsSent(true);
    // setChecked(-1);
    if (answerSelected === cardPicked.cardMeaning) {
      console.log("correct");
      setResult(true);
      helpHttp().post(urlIncreaseScore);
    } else {
      console.log("incorrect");
      setResult(false);
    }
  };

  const openModalQuestion = (e) => {
    // e.preventDefault();
    if (!cards.cards) {
      alert("Agrega más cartas UwU");
      return;
    } else {
      generateQuestion();
      modalQuestion ? setModalQuestion(false) : setModalQuestion(true);
    }
  };
  const nextQuestion = () => {
    setAnswerSelected();
    generateQuestion();
    setResult();
    setIsSent(false);
  };

  const toggleMode = () => {
    setMode(!mode);
  };

  const handleAudio = (word) => {
    const params = {
      OutputFormat: "mp3", // or 'ogg_vorbis'
      Text: word,
      VoiceId: "Salli",
    };
    polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const audioBlob = new Blob([data.AudioStream], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudio(audioUrl);

        // you can then use the audioUrl to play the audio file in your app
      }
    });
  };
  useEffect(() => {
    audioRef.current.play();
  }, [audio]);

  return (
    <>
      {/* <AboutUser wasUp={result}></AboutUser> */}

      <div className="all-cards">
        {paramsUrl.section === "mis-cartas" && (
          <div className="del-cards">
            <NavLink to="/cards/delete">
              <button className="btn btn-accent btn-sm">
                <strong>Eliminar ó Editar</strong>
              </button>
            </NavLink>
          </div>
        )}

        <Swiper
          keyboard={true}
          mousewheel={true}
          className="mySwiper"
          effect={"cards"}
          modules={[EffectCards, Mousewheel, Pagination, Keyboard]}
        >
          {/* <CardTuto></CardTuto> */}
          {!cards ? (
            loader && <Loader />
          ) : !cards.cards ? (
            <div className="nada-por-aqui">
              <strong>Nada por aqui... Agrega tus cartas 💾</strong>
              {loader && <Loader />}
            </div>
          ) : (
            cards.cards.map((card, key) => {
              // console.log(cards);
              return (
                <SwiperSlide
                  style={{
                    borderColor: "white",
                    backgroundImage:
                      "url(" +
                      (card.imageURL === ""
                        ? urlImageCard + card.cardImage
                        : card.imageURL) +
                      ")",
                  }}
                  className="swiper-slide-card"
                  key={card.id}
                >
                  <div className="container-card">
                    <div className="card">
                      <div className="contenido-card">
                        <h3 onClick={handleDisplay} className="card-text">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                      </div>
                    </div>
                    <button
                      className="btn-sound-card"
                      onClick={() => {
                        handleAudio(card.cardTitle);
                      }}
                    >
                      <img className="word-sound" src={wordSound} alt="" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })
          )}
          <audio src={audio} ref={audioRef}></audio>
        </Swiper>
        {paramsUrl.section === "mis-cartas" && (
          <div className="container-icon-add">
            {cards.cards && cards.cards.length >= 10 && !isPremium ? (
              <>
                <div className="container-updatein-card">
                  <div className="alert-no-more-cards">
                    <strong>
                      Para seguir agregando cartas, actualízate a premium
                    </strong>
                  </div>
                  <div>
                    <PayPal />
                  </div>
                </div>
              </>
            ) : (
              <img
                onClick={openModal}
                className="icon-add mx-auto"
                src={iconAdd}
                alt=""
              />
            )}
          </div>
        )}
        {cards.cards && cards.cards.length > 3 && (
          <Modal
            // className="modal-card-question"
            ariaHideApp={false}
            style={customStyles}
            isOpen={modalQuestion}
            contentLabel="Minimal Modal Example"
            // className="bg-red-400"
            // className="modal-quiz"
          >
            <OutsideClickHandler
              onOutsideClick={() => {
                hideQuestion();
              }}
            >
              <label className="switch">
                <input type="checkbox" onClick={toggleMode} />
                <span className="slider"></span>
              </label>
              {cardPicked && (
                <>
                  <div
                    style={{ color: mode ? "black" : "white" }}
                    className="container-question-card"
                  >
                    <div className="question-card">
                      Elige el significado de
                      <strong> {cardPicked.cardTitle}</strong>
                    </div>
                    <div className="parent-answers">
                      {answers &&
                        answers.map((answer, key) => {
                          return (
                            <div key={answer.id} className="box-answers">
                              <label
                                className={
                                  cardPicked.cardMeaning ===
                                    answer.cardMeaning &&
                                  isSent &&
                                  !result
                                    ? "red-label showAnswer"
                                    : "rad-label"
                                }
                              >
                                <input
                                  id={key}
                                  type="radio"
                                  className="rad-input"
                                  name="rad"
                                  onChange={handleChangeRadio}
                                  value={answer.cardMeaning}
                                  checked={checked == key && true}
                                />
                                <div className="rad-design"></div>
                                <div className="rad-text">
                                  {answer.cardMeaning}
                                </div>
                              </label>
                            </div>
                          );
                        })}
                    </div>

                    <div className="parent-btn">
                      <button
                        className={isSent ? "hide" : "btn-send-answer "}
                        onClick={handleAnswer}
                      >
                        Enviar
                      </button>
                    </div>

                    <div
                      className="next-quest"
                      style={{
                        bottom: isSent ? "0" : "-83px",
                      }}
                      onClick={nextQuestion}
                    >
                      <img
                        onClick={nextQuestion}
                        className="next-icon"
                        src={next}
                        alt=""
                      />
                      <div className="container-result-message">
                        <div
                          className={
                            isSent
                              ? result
                                ? "message-question answer-right"
                                : "message-question answer-wrong "
                              : "hide"
                          }
                        >
                          {result ? "Correcto" : "Incorrecto"}
                        </div>
                      </div>
                      {/* <div className="bg-white">Incorrecto</div> */}
                    </div>
                    <div
                      className={
                        result
                          ? "upScore-indicator upScoreAnimation"
                          : "upScore-indicator"
                      }
                    >
                      <strong>+1XP</strong>
                    </div>
                  </div>
                </>
              )}
            </OutsideClickHandler>
          </Modal>
        )}
        {isPremium && (
          <div className="cont-btn-review flex justify-center flex-col gap-5 items-center">
            <button
              className="css-button-shadow-border-sliding--sky "
              onClick={openModalQuestion}
            >
              Quiz
            </button>
            <Link to="/phrases" state={{ crts: cards.cards }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  console.log(cards.cards);
                  <Phrases cartas={cards.cards}></Phrases>;
                }}
              >
                HardCore quiz
              </button>
            </Link>
          </div>
        )}
      </div>
      <FormCard
        fetchApi={fetchAPi}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      />

      <MenuBar wasUp={result} />
    </>
  );
};

export default Cards;
