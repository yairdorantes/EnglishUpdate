import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";
import mySite from "./Domain";
import wordSound from "../media/cards/audio.png";
import { useLocation } from "react-router-dom";
// const cards = [
//   {
//     id: 40,
//     owner_id: 1,
//     categoria_id: null,
//     cardTitle: "Hold on",
//     cardMeaning: "Esperar",
//     cardSound:
//       "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VFRUWCQsJAuKirPFRQWFhYWFRXt4qKioqKCws3//+sVFRVVMQU1FVVVVTEFNRTMu//NExJ0SGSnsAHmGcDEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKcRkDkMADGEBDEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMu//NExKwAAANIAAAAADEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NExKwAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV",
//     cardImage: "media/cards/temp_a5w1ey",
//     imageURL: "",
//   },
//   {
//     id: 53,
//     owner_id: 84,
//     categoria_id: null,
//     cardTitle: "Cat",
//     cardMeaning: "Gato",
//     cardSound:
//       "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",
//     cardImage: "media/cards/temp_ri7isy",
//     imageURL: "",
//   },
//   {
//     id: 54,
//     owner_id: 1,
//     categoria_id: null,
//     cardTitle: "Grant",
//     cardMeaning: "Conceder",
//     cardSound:
//       "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",
//     cardImage: "",
//     imageURL:
//       "https://thumbs.dreamstime.com/b/vector-access-granted-grunge-stamp-seal-tick-inside-green-label-surface-round-rubber-imprint-scratched-139450395.jpg",
//   },
//   {
//     id: 23,
//     owner_id: 1,
//     categoria_id: null,
//     cardTitle: "Weak sauce",
//     cardMeaning: "No buena calidad",
//     cardSound:
//       "//NExAAAAANIAUAAAP8w8BfM70NMzB/+VykDB7+f8Pz6JcW4g9hQv/FHUL/PnYzp+/+L/5/zMtQf/ndv1wlA5j///f57h3RiKaQH/h85vRiQLlkJEpIwaAkxRAwABIDB//NExFMSQnI8AZsQAKzbuiTGlJDCs5TKMPDPpQjaMszFwLDHESTFQpDJwdgEQBUAIeBQwDAdAk5bYHdYfA8Yf99ArVLNOKvwVUbf7/lNv9/pSk3vf21yZZHIvUONSavb//NExF0gkOpEAd1gAXS/hD91Th+gwN9CU/6+fZ29L/30S/uf999/f1bw5P5/6yc61+cVQiQ3VwJBc3gag7LmBgSUDQwIWjeWSMtARh61QKUHXHwkKKBQMXjLtwNYmWYQ//NExC0TkOpcAObGcCdmorCud+6KjFBbomX8KcQkYdFixJxC9anfReXXwP+valUwGAVfyJoNA4EQkYoCwCARAIIJUGhbwmH4xmDYCF6SEJjE0h0S5TGRgIiwgY1+NSjl//NExDEXMYpkAO4ElCWbDoyi9vsMWP/ljuv3OYf+mTMEOz2Fn1dlzn8zf/751FqUZKCivo////+hhUphpOUxusNmMRwMRYMEATNtUxTiNwEmdsuLwg8TJJS1tSgZmDLE//NExCcbIap8AN4GlFBMPGRF1DW02tLfvUqRajS2nxjtPT39b1Usa58XsQzL0Sm8UDO78Qt/yc5T/e4dydwMWXkZgBMEEkNX///xPAgYuPlwIMX8dbUWNOqHhEDwKsCY//NExA0VOY6oANJKlCMnKGMUv+QmW5ytntqoYlSgWBJsUhkaRtMyQEazLfJyhIU6h97MgCAACCai6yCoaAAEFCsT/v20aiKYUIHilCaQGD7v////1v/9R0RRgsin5Mw6//NExAsVIZqsAMoYlJlgqiW5bA8e/yp9/ylfr+zN3Uipr2Tq0xo/ay4UgURLC2dE8REscEK1af3X29y7/bmz3Vy1MtLv0y65kGCxobSKlRgD////+1ia1+8Jt1Q3GHK///NExAkTkaqwAMnYlHkAii7b32oC0ebmjjfM+/o5/ta/02suTv7hKCoFkO8BOMkalXsK1SVixTLM0fmZ2tr/a31/pr1lq+PGAR2pZy7////9huq2sSwC4Ydp90CkBQiI//NExA0VofaoAKKamAzPwDRu/KFW9W9TPof81+dHqQmpE4E+B/C8EotlBbh2D0QRYcQzpIPWSJg2is4mnzEuGCDJSSOl920X/6jJMj8V//vpfu3CkMkKq71jqHzqL1eT//NExAkTya6cANFalFrGcJRoYFhI9kGMBn8Bi+pfv+Z/qR2ccJKoMyY+gpoLEvMXJONy6ikgmSJdStUk77/Uki1S0D6jxpbu9YLfkv/0UedrlYtVVzSRuJDBwUhTQee1//NExAwRCSp0AMNOcGiVhTIEaC0komgXkVLVqdHS//6fm0f8oyjUig3EkcBcJOGgVDboNKlsgVALirCxZ7L87///9Gn1qjgJXdFoPYCOhHG0qOBYzDsZZTFXrYdxp+Uj//NExBoQKDpUAVkYAPSh7iggHDWLY5gKjDbVsal4ogL+XQvxrWVCBibygY7v1v8vxyjkbSPwzvst1quaHu0rOK6OvIU8wUIj5MGnkwcNE91+HYfgrBueaHoCgBA55/w7//NExCwbOxaMAYxAAR6D6QFgiCou9//9JSLaHuPMIT///m/2FK4p3tEQU////ShQykl6m5EhAfvuH5y6//////6ClJwj3VP/AvOhCCgERwSJzB1kqiFu7Kt9N9mjrqdC//NExBIUIxawAYUoAZgHBXExcCC7KIuHHua5SixyIn27F7K2qV6X6lXrZ5emt1edLIytfnv7ZyMcUVBQlU+WzJT+nX9JCnAQijwCSgh/qqGK/T/u3/6IVFJEsdDKkpDL//NExBQTMx6wAcUQAL9PW/v6fvs3pW2tVzLQi+YqJSqmoVCorByHdlfVGkZFusgMglUsUcSFFusMtCBkBuHcACMc5AhR1g///////kWf/L//9//////9/H/02v+mkdd///NExBoRyx6wAAhQvB/TJPzpytK9Vy0yfaTvFJXYyZsU3lsRxHFDHE4fMLhGJz0LICgoSFygqEk2YlUP//////+//////////066OiNprrW1EY1WR7XOs9Hdh9zlPcqy//NExCUR6x6wAAhOvAwcPqVWcSOGxdTAmHQehYHo4eceJBQfEcJxJAuN4wNyAWFqL/7/////mRf////X////t/aYv79t0W3Q9u5zEJDOVSZDFOYyayI8XMx4i2JypKgX//NExDARKxasAAhUucPiM5BFD4WmNGhVR4IQwbBOF5YwXRa/+b////87/O///5V////p/X9l1vMv09DOp7M7NY10ectT2V1JjGIVH4uJio1liE48gMMKDA0QwyCuFGXD//NExD4SAx6wABBUvTG4X4ggoBFEhgqZGSGA1JAX+///+Xn3////t///9nTovX9v5Hkpvy1VpUPLfMpjI5xUaxDlRBZxo0UILDEOIBo0RYARYaUYPAEARUdKmbnJt2Aa//NExEkQuxq0AAhKvVYE+7+QIFxix2WP3FHLkkgwsLTUvtvFQDhteDTg8Yq9GSFHywswwM01p/SsgixH/qtU5n53VBV27/6cOlskHF6q1v96GpU9LTJbg7UH0tZLQISw//NExFkRoLKsAMYYTFsUCMgDw0685fDjOmeEHAjVS4JMG2ehLTpZFKtPa/E4aKDJBQHHydVAYImEoc5O+mp0EEWk+xCavSA6A5mWTUuG2xykqa9iR24gDciTeTqO4laL//NExGUSYLqwAMYeTNygVInFLaZ3B0Mqzz5Djvd/dul7B2UOicsoIHlEkD3INrTObUK9aqalUe63cJURjdSZBpG839cuxyWXm5gtKO011D1O69ZhgLqJ96jEkBOG2aIG//NExG4ROLq0AG4wTMVjRF1lxul1odH78xfV7Hni26Et3S5H3KUuM7AjwZXk4QmtByrvuiXesv6kQC1alNRVQGmWTzAAQAOlC3AS8CxFaqvdROd3+7QxQahnOrLRWgiF//NExHwQYT6wAMZgcMLDkC91qJB3KjFKz5q6Sjs6rqqCQr+NZqDNqskYGKxVbDz6pFg6shlzSAg0uno8DFAQLFco+ziHrW69N39ds88d9T5H811YkkKSPwv/aqueoLQ7//NExI0RGLKwAG5wTEnwqFVDzVa9UOVaz6Ichzp0vOaRgrLqvWXvAJHUf1rYiEqKDlTtPdiK1KlnDmF6mhY9J17h7lCoBCr9aOyQZrWuuYXGfjXb1AooCsw9AaM4Ck2e//NExJsQkMKwAMYwTTadplUms5KhYflu6y2DrgZ2mOBEBRIclPkkEERE5DjNx7HCPBcc8eQPpO7O7s9FTM1mfdV3ueQSNxhFFFK0rSBuVoqU4QWDa1q4oeAgt5OjIoRV//NExKsRcLasAMYwTAO5BjKBATviFE2KzaHR5MVlUjlDABiFgUCMoyGKKZxYMDMEUChOBAAmEUfaX2lUuhvb64i5m+WXETW7dCz0SYaBOdNuU9MBgQyfGlhb9k6ut54m//NExLgVITakAMYgcKJQ/AAEuL5TQqCFylamxoVLVnmbnUGkcVQDGFLbO4XgMkQvEnYOEAY4rFARY0itYF2DScHhcHbxslrSua71863vOMZt6716bzqvtibx4XDbhtt6//NExLYX8S6YAM5WcKxSATqUGbftHANB1rnropWo0FZ4tSGjAHKSYYTHrHcbGEOyZ4SV0WVfoQrBK7N2RGcEUnRDBrL0KpiWFOKdYiiLnYtBq8r542qgNnBC0P3qUQnw//NExKkZATaUAM5ecJKFgKrotvFIancje7/xlXonnLN/C41kcfKNYYY2EZk18ts+sdL6oKu884JQ1JMicpVUBnBc4gp5pouAvlW3FueVimi7g88ODKKFKlQEhzzJf+7p//NExJgU2LaMAM5wTGoYQ0JudyImpqkaNurLakujnEaAPhOQlwIklacuLkM8JzkFeejIgmIBIcBgsO01Q6/9tm/96CYsjk1+/4o9F7tFs//h+mr2+iowD8rG2aw88tox//NExJcR6KaIAM4eTFmX/mitox/mEbev25Tm0RZxxuczWZHc9+a/39o8PVSvFIzkSv1TaPfH9b2/933UVO89NVkUg1l+oR3pxkIPVDxw+z0IHB+UhA4uz5eheZd6YcL0//NExKIREUKQAMMKcHDdxADgUEQQDQFyxc4UEQ8XJD9TRIDSgaEIKgBiSm16TmZnr6dld/pdinJYlnV+8PVK9Xp9keq/3yZnPye3pm+zszs9Ne3p/dn5vLFM+d3nophz//NExLAd0xKMAGGQuTqfNYOg+3Uy0DTSytjsnoSxl8zTKXFaGtfdP3Vja5CrIjnBjg4NHYkH5gfmpwTRqLphEmUHFQgFrf/////9eXf///8nP////96Pp/0XT+56unQf//NExIsbwxqUADiYvaMhjsaPI5xjueYeczDaWB8I5h5EZGxhApG5AbBwknEw2Ipc0CQjhcH43L0IP/1//nX//7////9r/////6Pp79trPVNXS7OdjyqhMu6H5M4qyzkM//NExG8RqyKkADhOvBspAbReSKj4Si8bDQHg3E5gFwdlhLCoTqaCBpUdEpEKDf///l///8v/////////+399c9aGrrqfVLmI10nyxw6ODg8QKHIPT1NQ0uI46NBIICOG//NExHsR6xqkAChOvUiKgoUB0ExM8CIPBqNALjQAkHIYCc4HBW//////+vX//////////pXzKaO10V2SzNXKkDzhwsQmnx8dYw1j3JHHROYQcmPGC8kPCMSYaiWJAoMG//NExIYSgxqgABBOvQ9Buea7xcD8IQOCMXlnA////9f//X/////////+3en223qqdqvPunPnkjUZnPtUoPKRYTHFR51NCxxqCkUkBWKB8iKiRojR8TgSLkhSPBOULSUS//NExI8SgyagAChOvP////////17fVatVejz106kKlXTV3TrUpF0GWbn0i+m50zJhoVpmiz1qQ/EiYEAvmKY1ojQH8YcfSAOISREexoS5dMSQRoX//////NlvL////f///NExJgQ6xqkABBOvf/////6tOSszv2Zj3zrUOmIacyCs555pKhU1yY8iIiFRIIxWEyKp4iRJBtISwfCcC8DJYqJpw2IzhsVa///+v/X8vn///6////XT72+pqebvVqc//NExKcRqxKcABAaudnOrVU3ZzjGd0nDaijpYamsMIpYajxQkUFkSRcFoqHwsNgekxqOCPAaA0A0VHqQGxIBL/yp9fvr////p///////1f///ZTadzk7ZqHV0sdPY8u9//NExLMSAx6gAAhUvMssiczliykyJGPXNFw6o0FQXEQCxZxgboQHlHhcc8JqBXq85nee9jxcf99u3+o0H11/2qBquf4X/8sCErX8dse+n//3BtPSZ7/W0L//9Hv7wLQK//NExL4SQxqYAAhOvb22tXcXv///vCesrO/o07tmC9gafev////gp1ac3CjA/TiGkhN/TW+zrErpWvYrD/////+1KQ7S4iUNIl4S4wiLL2RCgQn+Z9WLhqFuPLBPjqbW//NExMgQUw6UAUI4AVOWEgCAIDCylKX///KVqGAizf//+Ur9SlKV1KWhgwpkMY3/+Z5Sl/oYxv/+YxmQz/6lKUrSlKWYCAi5P4FIgp4KLxBTf6K8KCZMQU1FTEFNRTMu//NExNkh8upoAY94ADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKQRso3QAcUQATEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMu//NExKwAAANIAAAAADEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExKwAAANIAAAAAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//NExKwAAANIAAAAAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
//     cardImage: "",
//     imageURL:
//       "https://okdiario.com/img/2019/08/31/como-reparar-un-jarron-roto-de-manera-creativa-pasos.jpg",
//   },
// ];
// const urlImageCard = "https://res.cloudinary.com/tolumaster/image/upload/v1/";

const Quiz = () => {
  const location = useLocation();
  const { cards, section } = location.state;
  // console.log(cards);
  let { user } = useContext(AuthContext);
  const audioRef = useRef();

  let urlIncreaseScore = `${mySite}increase/${user.user_id}`;
  const [radioActive, setRadioActive] = useState();
  const [cardPicked, setCardPicked] = useState();
  const [answers, setAnswers] = useState();
  const [correct, setCorrect] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [cont, setCont] = useState(1);
  const [audio, setAudio] = useState();
  const handleRadio = (number) => {
    setRadioActive(number);
    if (number === cardPicked.id) {
      setCorrect(true);
      setIsSent(true);
      axios.post(urlIncreaseScore);
    } else {
      setCorrect(false);
      setIsSent(true);
    }
  };

  const generateQuestion = () => {
    isSent && setCont(cont + 1);
    setIsSent(false);
    setRadioActive(-1);
    const arr = cards,
      shuffled = arr.sort(() => 0.5 - Math.random()),
      randomValues = shuffled.slice(0, 3);
    setAnswers(randomValues);
    const randomIndex = Math.floor(Math.random() * randomValues.length);
    setCardPicked(randomValues[randomIndex]);
  };

  const handleAudio = (sound) => {
    const audio = `data:audio/mpeg;base64,${sound}`;
    setAudio(audio);
    audioRef.current.play();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <>
      <div className="h-screen bg-gray-900">
        <div className="w-full max-w-md mx-auto  mt-20">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Quiz secci??n <span className="text-teal-500">{section}</span>
          </h1>
          <form>
            <div className="bg-slate-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4">Pregunta {cont}</h2>
              <p className="mb-4 text-xl">
                ??Cu??l es el significado de{" "}
                <span className="font-bold">
                  {cardPicked && cardPicked.cardTitle}
                </span>
                ?
                <img
                  onClick={() => handleAudio(cardPicked.cardSound)}
                  className="w-6 mt-2 ml-2"
                  src={wordSound}
                  alt=""
                />
              </p>

              <audio autoPlay src={audio} ref={audioRef} />
              {/* <div
                className="bg-contain m-2 bg-no-repeat bg-center  mx-auto w-4/6 h-48 "
                style={
                  cardPicked && {
                    borderColor: "white",
                    backgroundImage:
                      "url(" +
                      (cardPicked.imageURL === ""
                        ? urlImageCard + cardPicked.cardImage
                        : cardPicked.imageURL) +
                      ")",
                  }
                }
              ></div> */}
              {answers &&
                answers.map((answer) => {
                  return (
                    <div
                      key={answer.id}
                      onClick={() => handleRadio(answer.id)}
                      className={`mb-4 font-bold ${
                        isSent
                          ? correct
                            ? answer.id === cardPicked.id
                              ? "bg-emerald-800"
                              : "bg-gray-900"
                            : answer.id === cardPicked.id
                            ? "bg-emerald-800"
                            : radioActive === answer.id
                            ? "bg-red-800"
                            : "bg-gray-900"
                          : "bg-gray-900"
                      }  h-12 flex  rounded-md`}
                    >
                      <label className="inline-flex items-center">
                        <input
                          readOnly
                          type="radio"
                          name="q1"
                          value="b"
                          checked={radioActive === answer.id ? true : false}
                          className="radio radio-success h-5 w-5 ml-2 text-blue-600"
                        />
                        <span className="ml-4 text-gray-200">
                          {answer.cardMeaning}
                        </span>
                      </label>
                    </div>
                  );
                })}
              <div className="flex items-center justify-evenly">
                <div className="btn btn-success" onClick={generateQuestion}>
                  Siguiente
                </div>

                {isSent ? (
                  correct ? (
                    <div className="alert alert-success shadow-lg w-1/2">
                      <div>
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
                        <span>Correcto! +1</span>
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-error shadow-lg w-1/2">
                      <div>
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
                        <span>Incorrecto</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-1/2"></div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Quiz;
