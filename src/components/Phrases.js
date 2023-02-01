import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import mySite from "./Domain";
import Loader from "./Loader";
const Phrases = ({ myCards = true, section, cartas }) => {
  const location = useLocation();
  const { crts } = location.state;
  console.log(crts);

  const [cards, setCards] = useState(crts);
  const [phrase, setPhrase] = useState("hi how is your day");

  const [test, setTest] = useState("");
  const [wordSelected, setWordSelected] = useState();
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState();
  const [isSent, setIsSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [collapse, setCollapse] = useState(false);
  // let { user } = useContext(AuthContext);
  // let url;
  // myCards === true
  //   ? (url = `${mySite}usercards/${user.user_id}`)
  //   : (url = `${mySite}cards/${section}`);

  const generateWord = () => {
    setAnswer("");

    setTest();
    setLoader(true);
    const word = cards[Math.floor(Math.random() * cards.length)];
    setWordSelected(word.cardTitle);
    console.log(word.cardTitle);

    const urlPhrases = `${mySite}phrases/${word.cardTitle}`;
    // console.log(str);
    console.log(urlPhrases, "ssiisi");
    axios
      .get(urlPhrases)
      .then((res) => {
        console.log(res.data);

        let modifyPhrase = res.data.phrase.replace(/'/g, "").replace(/"/g, "");
        setTest(modifyPhrase.replace(new RegExp(word.cardTitle, "i"), "___"));
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAnswer = () => {
    setIsSent(true);
    if (answer != "" && wordSelected.toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };
  const nextQuestion = () => {
    generateWord();
    setIsSent(false);
  };
  const handleChange = (e) => {
    const wordAnswer = e.target.value;
    setAnswer(wordAnswer);
  };
  const handleCollapse = (e) => {
    setCollapse(!collapse);
  };
  useEffect(() => {
    generateWord();
  }, []);

  return (
    <div className="h-[100vh] bg-base-200">
      <h3 className="text-3xl font-bold dark:text-white text-center mb-10">
        Completa la frase con la palabra faltante
      </h3>
      <div className="card w-96 mx-auto bg-primary-content gap-5 p-7">
        {loader && <Loader className="mx-auto text-center" />}
        <div className="text-2xl font-bold text-white">{test}</div>

        <input
          type="text"
          placeholder="Escribe la palabra faltante"
          className="input input-bordered text-center max-w-xs mt-10"
          onChange={handleChange}
          autoFocus
          value={answer}
        />

        {!isSent ? (
          <button className="btn btn-success" onClick={handleAnswer}>
            send
          </button>
        ) : (
          <div
            className={`alert shadow-lg flex flex-wrap transition duration-300 ${
              isCorrect ? "alert-success" : "alert-error"
            }`}
          >
            <div className="mx-auto">
              {isCorrect ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}

              <span>{isCorrect ? "Correcto" : "Palabra correcta: "}</span>
            </div>
            {!isCorrect && (
              <div className="w-full flex justify-center text-centerfont font-bold text-xl">
                {wordSelected}
              </div>
            )}
            <button className="btn w-full mx-auto" onClick={nextQuestion}>
              siguiente question
            </button>
          </div>
        )}
      </div>
      <div
        onClick={handleCollapse}
        className={`collapse ${
          collapse ? "collapse-open" : "collapse-close"
        } collapse-arrow border border-base-300 bg-base-100 rounded-box cursor-pointer sm:w-1/2 mx-auto mt-10`}
      >
        <div className="collapse-title text-xl font-medium">
          Posibles respuestas
        </div>
        <div className="collapse-content">
          {cards.map((card, key) => {
            return <li key={key}>{card.cardTitle}</li>;
          })}
        </div>
      </div>
      {/* <Loader className="" /> */}
    </div>
  );
};

export default Phrases;
