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
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import FormCard from "./FormCard";
import PayPal from "./PayPal";
import { helpHttp } from "../helpers/helpHttp";
import mySite from "./Domain";
import axios from "axios";
// import Phrases from "./Phrases";
import NewMenu from "./NewMenu";
// import Quiz from "../components/Quiz";

// import CardTuto from "./CardTuto";
let url = "";
const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const Cards = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const audioRef = useRef();
  const paramsUrl = useParams();
  const [audio, setAudio] = useState();
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchAPi = async () => {
    setLoader(true);
    paramsUrl.section === "mis-cartas"
      ? (url = `${mySite}usercards/${user.user_id}`)
      : (url = `${mySite}cards/${paramsUrl.section}`);
    axios.get(url).then((res) => {
      setCards(res.data);
      setLoader(false);
      console.log(res.data);
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

  const handleDisplay = () => setIsActive(!isActive);

  const openModal = () => setModalIsOpen(!modalIsOpen);

  const handleAudio = (sound) => {
    const audio = `data:audio/mpeg;base64,${sound}`;
    setAudio(audio);
    audioRef.current.play();
  };

  return (
    <>
      <NewMenu />
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
                        handleAudio(card.cardSound);
                      }}
                    >
                      <img className="word-sound" src={wordSound} alt="" />
                    </button>
                  </div>
                </SwiperSlide>
              );
            })
          )}
          <audio autoPlay src={audio} ref={audioRef} />
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

        {isPremium && (
          <div className="cont-btn-review flex justify-center flex-col gap-5 items-center">
            <button
              onClick={() =>
                navigate("/test", {
                  state: {
                    cards: cards.cards,
                    section:
                      paramsUrl.section === "mis-cartas"
                        ? "Mis cartas"
                        : paramsUrl.section,
                  },
                })
              }
              className="btn bg-blue-700 w-36"
            >
              Quiz
            </button>
            {/* <Link to="/phrases" state={{ crts: cards.cards }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  console.log(cards.cards);
                  <Phrases cartas={cards.cards}></Phrases>;
                }}
              >
                HardCore quiz
              </button>
            </Link> */}
          </div>
        )}
      </div>
      <FormCard
        fetchApi={fetchAPi}
        modalIsOpen={modalIsOpen}
        openModal={openModal}
      />
    </>
  );
};

export default Cards;
