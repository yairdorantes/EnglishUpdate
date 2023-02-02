import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import first from "../media/first.png";
import second from "../media/second.png";
import third from "../media/third.png";
import mySite from "./Domain";

const NewLeaderBoard = ({ estado }) => {
  const [tops, setTops] = useState([]);
  const getTop = () => {
    helpHttp()
      .get(`${mySite}topusers/`)
      .then((res) => {
        setTops(res.topuser);
      });
    // helpHttp()
    //   .get(`${mySite}users/${user.user_id}`)
    //   .then((res) => {
    //     setUserData(res.user);
    //     console.log(res);
    //     console.log(res.user.score);
    //   });
  };
  useEffect(() => {
    getTop();
  }, []);

  return (
    <div className={estado ? "" : ""}>
      <div
        className={`text-black sm:w-3/4  absolute m-auto left-0 right-0 z-10  ${
          estado ? "-mt-[0px]" : "-mt-[500px]"
        } transition-all duration-300 `}
        // onClick={() => handleLeaderBoard()}
      >
        <table className="w-full text-left bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-sm font-bold uppercase tracking-wide">
                Rank
              </th>
              <th className="px-4 py-2 text-sm font-bold uppercase tracking-wide">
                Nombre
              </th>
              <th className="px-4 py-2 text-sm font-bold uppercase tracking-wide">
                XP
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 text-xl">
                <img src={first} className="w-10" alt="" />
              </td>

              <td className="border px-4 py-2 text-xl font-bold">
                {tops[0] && tops[0].username}
              </td>
              <td className="border px-4 py-2 text-xl font-bold">
                {tops[0] && tops[0].score}
              </td>
            </tr>
            <tr className="bg-gray-200">
              <td className="border px-4 py-2 text-xl ">
                <img src={second} className="w-10" alt="" />
              </td>
              <td className="border px-4 py-2 text-xl font-bold">
                {tops[1] && tops[1].username}
              </td>
              <td className="border px-4 py-2 text-xl font-bold">
                {tops[1] && tops[1].score}
              </td>
            </tr>
            <tr className="bg-gray-100">
              <td className="border px-4 py-2 text-xl ">
                <img src={third} className="w-10" alt="" />
              </td>
              <td className="border px-4 py-2 text-xl font-bold">
                {tops[2] && tops[2].username}
              </td>
              <td className="border px-4 py-2 text-xl font-bold">
                {tops[2] && tops[2].score}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewLeaderBoard;
