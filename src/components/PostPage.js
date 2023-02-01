import "./styles/singlePost.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import AuthContext from "../context/AuthContext";
// import MenuBar from "./MenuBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isMobile } from "react-device-detect";
import mySite from "./Domain";
import MenuBar from "./MenuBar";

const parametros = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

const PostPage = () => {
  let { user } = useContext(AuthContext);
  const [post, setPost] = useState();
  const params = useParams();

  const fetchAPi = async () => {
    let url = `${mySite}post/${params.id}`;
    const response = await fetch(url, parametros);
    const responseJSON = await response.json();
    setPost(responseJSON.post[0]);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  return (
    <>
      <div className="container-post-content pb-[100px]">
        {!post ? (
          <Loader></Loader>
        ) : (
          <div className="post-content">
            <h1 className="title-post text-4xl font-bold">{post.title}</h1>
            <div className="box-image-post">
              <img className="image-single-post" src={post.image_src} />
            </div>

            <div
              className="box-text-post"
              style={{
                fontSize: isMobile ? "18px" : "20px",
                padding: isMobile && "20px",
              }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                children={post.content}
              ></ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      <MenuBar></MenuBar>
    </>
  );
};

export default PostPage;
