import { Routes, Route } from "react-router-dom";
import Cards from "../components/Cards";
// import LoginAuth from "../components/LoginAuth";
// import LoginPage from "../components/LoginPage";
// import Session from "../components/Session";
import { AuthProvider } from "../context/AuthContext";

import PrivateRoute from "./PrivateRoute";
import Posts from "../components/Posts";
import PostPage from "../components/PostPage";
// import Stripe from "../components/Stripe";
import DeleteCards from "../components/DeleteCards";
import MenuV2 from "../components/MenuV2";
import SubMenuCard from "../components/SubMenuCard";
import Phrases from "../components/Phrases";
import NewLogin from "../components/NewLogin";
import NewSignUp from "../components/NewSignUp";
import NewLeaderBoard from "../components/NewLeaderBoard";
import NewMenu from "../components/NewMenu";
import UserInfo from "../components/UserInfo";
const Routers = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<NewSignUp />} />

        <Route path="/login" element={<NewLogin />} />
        {/* <Route path="/login" element={<LoginAuth />}></Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="/cards" element={<SubMenuCard />} />
          <Route path="/cards/:section" element={<Cards />} />

          <Route path="/posts" element={<Posts />} />
          <Route path="/postpage/:id" element={<PostPage />} />
          <Route path="/cards/delete" element={<DeleteCards />} />
          <Route path="/cards/delete" element={<DeleteCards />} />
          <Route path="/phrases" element={<Phrases section="animales" />} />
          {/* <Route path="/form-card" element={<FormCard />}></Route> */}

          {/* <Route path="/stripe" element={<Stripe />}></Route> */}
          <Route path="/" element={<SubMenuCard />} />
          <Route path="/test" element={<UserInfo />}></Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default Routers;
