import "./styles/postCards.css";
import { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import { helpHttp } from "../helpers/helpHttp";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import MenuBar from "./MenuBar";

// import remarkGfm from "remark-gfm";
import { isMobile } from "react-device-detect";
import mySite from "./Domain";
import Heart from "./Heart";
import axios from "axios";
import NewMenu from "./NewMenu";

let url = `${mySite}postset/`;
let like = `${mySite}posts/`;

const Posts = () => {
  let { user } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);

  const [posts, setPosts] = useState();

  const fetchAPi = async () => {
    axios
      .get(url)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err, "here");
      });
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  const giveLike = (post) => {
    let updatedPost = { ...post };
    updatedPost.likes_count += 1;
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    let options = {
      body: { is_like: true, id: post.id, user_id: user.user_id },
      headers: { "content-type": "application/json" },
    };
    helpHttp().post(like, options);
  };
  const giveDislike = (post) => {
    let updatedPost = { ...post };
    updatedPost.likes_count -= 1;
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    let options = {
      body: { is_like: false, id: post.id, user_id: user.user_id },
      headers: { "content-type": "application/json" },
    };
    helpHttp().post(like, options);
  };

  return (
    <>
      <NewMenu />
      <div
        className="main-container-post"
        style={{ height: isMobile ? "100%" : "100vh" }}
      >
        <div className="container-posts">
          {!posts ? (
            <Loader></Loader>
          ) : (
            posts.map((post) => {
              return (
                <div key={post.id} className="card-post">
                  <Link to={`/postpage/${post.id}`} className="link-post">
                    <div
                      style={{ backgroundImage: "url(" + post.image_src + ")" }}
                      className="box-img-post-card"
                    ></div>
                    <div
                      style={{ backgroundColor: `${post.categoria.color}` }}
                      className="section-post"
                    >
                      <span>{post.categoria.name}</span>
                    </div>
                    <div className="container-card-text">
                      <h3 className="title-post-card">{post.title}</h3>
                    </div>
                  </Link>

                  <div className="">
                    <Heart
                      txt={post.likes_count}
                      state={
                        post.likes.indexOf(user.user_id) !== -1 ? true : false
                      }
                      actions={{
                        like: () => giveLike(post),
                        dislike: () => giveDislike(post),
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
