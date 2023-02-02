import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mySite from "../components/Domain";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const handleLeaderBoard = () => setShowLeaderBoard(!showLeaderBoard);
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  console.log(user);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    console.log(e.target);
    e.preventDefault();
    let response = await fetch(`${mySite}token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    if (response.status === 200) {
      console.log("success");
      console.log(data);
      setAuthTokens(data);

      setUser(jwt_decode(data.access));
      console.log(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("Ups, algo salió mal intentalo de nuevo");
    }
  };
  // let loginAfterSignUp =()=>{

  let loginAfterSignUp = async (dataSignUp) => {
    let response = await fetch(`/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: dataSignUp.username,
        password: dataSignUp.password,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      console.log("success");
      console.log(data);
      setAuthTokens(data);

      setUser(jwt_decode(data.access));
      console.log(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    } else {
      alert("something went wrong");
    }
  };
  // }

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  // let updateToken = async () => {
  //   console.log("update token called");
  //   let response = await fetch(`${mySite}token/refresh/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       refresh: authTokens?.refresh,
  //     }),
  //   });
  //   let data = await response.json();

  //   if (response.satus === 200) {
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //   } else {
  //     console.log("err");
  //     //logoutUser();
  //   }
  //   if (loading) {
  //     setLoading(false);
  //   }
  // };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loginAfterSignUp,
    showLeaderBoard: showLeaderBoard,
    handleLeaderBoard,
  };

  // useEffect(() => {
  //   if (loading) {
  //     updateToken();
  //   }
  //   let fourMinutes = 1000 * 60 * 4;
  //   let interval = setInterval(() => {
  //     if (authTokens) {
  //       updateToken();
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
