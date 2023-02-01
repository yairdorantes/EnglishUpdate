import React, { useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
import { helpHttp } from "../helpers/helpHttp";
import first from "../media/first.png";
import second from "../media/second.png";
import third from "../media/third.png";
import mySite from "./Domain";

const NewLeaderBoard = () => {
  //   let { user } = useContext(AuthContext);
  const [userData, setUserData] = useState();
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
    <div className="text-black sm:w-3/4 mx-auto">
      <table class="w-full text-left bg-white shadow-lg rounded-lg">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="px-4 py-2 text-sm font-bold uppercase tracking-wide">
              Rank
            </th>
            <th class="px-4 py-2 text-sm font-bold uppercase tracking-wide">
              Nombre
            </th>
            <th class="px-4 py-2 text-sm font-bold uppercase tracking-wide">
              XP
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2 text-xl">
              <img src={first} className="w-10" alt="" />
            </td>

            <td class="border px-4 py-2 text-xl font-bold">
              {tops[0] && tops[0].username}
            </td>
            <td class="border px-4 py-2 text-xl font-bold">
              {tops[0] && tops[0].score}
            </td>
          </tr>
          <tr class="bg-gray-200">
            <td class="border px-4 py-2 text-xl ">
              <img src={second} className="w-10" alt="" />
            </td>
            <td class="border px-4 py-2 text-xl font-bold">
              {tops[1] && tops[1].username}
            </td>
            <td class="border px-4 py-2 text-xl font-bold">
              {tops[1] && tops[1].score}
            </td>
          </tr>
          <tr class="bg-gray-100">
            <td class="border px-4 py-2 text-xl ">
              <img src={third} className="w-10" alt="" />
            </td>
            <td class="border px-4 py-2 text-xl font-bold">
              {tops[2] && tops[2].username}
            </td>
            <td class="border px-4 py-2 text-xl font-bold">
              {tops[2] && tops[2].score}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewLeaderBoard;
