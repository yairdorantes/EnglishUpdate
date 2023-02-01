import "./styles/submenus.css";
import { helpHttp } from "../helpers/helpHttp";
import { useEffect, useState } from "react";
import me from "../media/my.png";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";
import { isMobile } from "react-device-detect";
import mySite from "./Domain";
import Loader from "./Loader";

// http://127.0.0.1:8000/api/cards/animales
const SubMenuCard = () => {
  const [categories, setCategories] = useState([]);
  const fetchData = () => {
    helpHttp()
      .get(`${mySite}categories`)
      .then((res) => setCategories(res));
  };

  // const items = ["orange-600", "lime-600", "blue-400", "pink-400", "red-600"];
  const items = [
    "bg-orange-800",
    "bg-sky-800",
    "bg-teal-800",
    "bg-purple-800",
    "bg-pink-800",
  ];

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className="p-24 flex flex-wrap  items-center justify-center">
          <div
            className={`flex-shrink-0 m-6 relative overflow-hidden bg-rose-800 rounded-lg max-w-xs shadow-lg`}
          >
            {/* <Link style={{ textDecoration: "none" }} to="/cards/mis-cartas"></Link> */}
            <Link to={`/cards/mis-cartas`}>
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{ transform: "scale(1.5)", opacity: "0.1" }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex  items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
                <img className="relative w-40" src={me} alt="" />
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                {/* <span className="block opacity-75 -mb-1">Aprender sobre:</span> */}
                <div className="flex justify-between">
                  <span className="block font-semibold text-xl">
                    Mis cartas
                  </span>
                  {/* <span className=" bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                        $68.50
                      </span> */}
                </div>
              </div>
            </Link>
          </div>
          {categories.categories ? (
            categories.categories.map((category, key) => {
              return (
                <div
                  key={key}
                  className={`flex-shrink-0 m-6 relative overflow-hidden ${
                    items[key % items.length]
                  } rounded-lg max-w-xs shadow-lg`}
                >
                  {/* <Link style={{ textDecoration: "none" }} to="/cards/mis-cartas"></Link> */}
                  <Link to={`/cards/${category.name}`}>
                    <svg
                      className="absolute bottom-0 left-0 mb-8"
                      viewBox="0 0 375 283"
                      fill="none"
                      style={{ transform: "scale(1.5)", opacity: "0.1" }}
                    >
                      <rect
                        x="159.52"
                        y="175"
                        width="152"
                        height="152"
                        rx="8"
                        transform="rotate(-45 159.52 175)"
                        fill="white"
                      />
                      <rect
                        y="107.48"
                        width="152"
                        height="152"
                        rx="8"
                        transform="rotate(-45 0 107.48)"
                        fill="white"
                      />
                    </svg>
                    <div className="relative pt-10 px-10 flex  items-center justify-center">
                      <div
                        className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                        style={{
                          background: "radial-gradient(black, transparent 60%)",
                          transform:
                            "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                          opacity: "0.2",
                        }}
                      ></div>
                      <img
                        className="relative w-40"
                        src={category.icon}
                        alt=""
                      />
                    </div>
                    <div className="relative text-white px-6 pb-6 mt-6">
                      <span className="block opacity-75 -mb-1">
                        Aprender sobre:
                      </span>
                      <div className="flex justify-between">
                        <span className="block font-semibold text-xl">
                          {category.name}
                        </span>
                        {/* <span className=" bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                        $68.50
                      </span> */}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <MenuBar></MenuBar>
    </div>
  );
};

export default SubMenuCard;
