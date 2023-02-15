import axios from "axios";
import { useContext, useEffect, useState } from "react";

import AuthContext from "../context/AuthContext";
import avatar from "../media/user.png";
import mySite from "./Domain";

const UserInfo = ({ showUserInfo }) => {
  let { user, logoutUser } = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const [joined, setJoined] = useState();
  console.log(user.username);
  useEffect(() => {
    axios
      .get(`${mySite}users/${user.user_id}`)
      .then((res) => {
        console.log(res.data.user);
        setUserData(res.data.user);
        const dateString = res.data.user.date_joined;
        const date = new Date(dateString);
        const options = {
          day: "numeric",
          month: "short",
          year: "numeric",
        };
        const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
          date
        );
        setJoined(formattedDate);
        console.log(formattedDate); // 21 Nov 2022
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* bg-[#071e34] */}
      <section
        style={{ fontFamily: "Montserrat" }}
        className="  flex font-medium items-center justify-center "
      >
        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">
              <span>Se unió:</span>
              <div>{joined}</div>
            </span>
            <span className="text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={avatar}
              className="rounded-full w-28 "
              alt="profile picture"
              srcSet=""
            />
          </div>

          <div className="mt-8 ">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              Bienvenid@ <br />
              {user.username}
            </h2>
          </div>
          <div className="mt-3">Estado Premium:</div>
          {userData && userData.premium ? (
            <p className="text-emerald-400 font-semibold ">Activo</p>
          ) : (
            <p className="text-rose-400 font-semibold ">Inactivo</p>
          )}

          <div className="mt-3 text-white text-sm">
            <span className="text-gray-400 font-semibold">XP:</span>
            <span className="font-bold">{userData && userData.score}</span>
          </div>
          <div className="mt-3 link link-error" onClick={logoutUser}>
            Cerrar sesión
          </div>
        </section>
      </section>
    </div>
  );
};

export default UserInfo;
