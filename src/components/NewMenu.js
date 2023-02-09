import cards from "../media/cards.png";
import blog from "../media/blog.png";
import trofeo from "../media/trofeo.png";
import user from "../media/user.png";
import { useState } from "react";

import { Link } from "react-router-dom";
import NewLeaderBoard from "./NewLeaderBoard";
import OutsideClickHandler from "react-outside-click-handler";
import UserInfo from "./UserInfo";
import Modal from "react-modal";

const customStyles = {
  content: {
    // color: "white",
    width: "300px",
    height: "300px",
    backgroundColor: "#00000000",
    outline: "none",
  },
  overlay: { zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.884)" },
};
const NewMenu = () => {
  // let { showLeaderBoard } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const handleUserInfo = () => setShowUserInfo(!showUserInfo);
  const handleLeaderBoard = () => setShowLeaderBoard(!showLeaderBoard);
  const handleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <Modal
        className="absolute m-auto top-[100px] left-0 right-0 "
        ariaHideApp={false}
        style={customStyles}
        isOpen={showUserInfo}
        // contentLabel="Minimal Modal Example"
      >
        <OutsideClickHandler onOutsideClick={() => setShowUserInfo(false)}>
          <UserInfo showUserInfo={showUserInfo} />
        </OutsideClickHandler>
      </Modal>
      <div className={showLeaderBoard ? "mio w-screen h-screen" : ""}>
        <OutsideClickHandler onOutsideClick={() => setShowLeaderBoard(false)}>
          <NewLeaderBoard estado={showLeaderBoard} />
        </OutsideClickHandler>
      </div>
      <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
        <div>
          <div data-dial-init className="fixed z-10 right-6 bottom-6 group">
            <div
              id="speed-dial-menu-hover"
              className={`${
                showMenu ? "flex" : "hidden"
              }  flex-col items-center  mb-4 space-y-2 transition-all delay-500`}
            >
              <div
                id="tooltip-share"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Share
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              {/* <Link to=""> */}
              <button
                type="button"
                data-tooltip-target="tooltip-print"
                data-tooltip-placement="left"
                onClick={() => {
                  handleLeaderBoard();
                  setShowMenu(false);
                }}
                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <img src={trofeo} alt="" className="w-3/4" />
                <span className="sr-only">Print</span>
              </button>
              {/* </Link> */}
              <div
                id="tooltip-print"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Print
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <Link to="/cards">
                <button
                  type="button"
                  data-tooltip-target="tooltip-download"
                  data-tooltip-placement="left"
                  onClick={() => setShowMenu(false)}
                  className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                >
                  <img src={cards} alt="" className="w-3/4" />
                  <span className="sr-only">Download</span>
                </button>
              </Link>
              <div
                id="tooltip-download"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Download
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
              <Link to="/posts">
                <button
                  type="button"
                  onClick={() => setShowMenu(false)}
                  data-tooltip-target="tooltip-copy"
                  data-tooltip-placement="left"
                  className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
                >
                  <img src={blog} alt="" className="w-3/4" />
                  <span className="sr-only">Copy</span>
                </button>
              </Link>

              <button
                type="button"
                data-tooltip-target="tooltip-share"
                data-tooltip-placement="left"
                onClick={() => {
                  handleUserInfo();
                  setShowMenu(false);
                }}
                className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
              >
                <img src={user} alt="" className="w-3/4" />
                <span className="sr-only">Share</span>
              </button>
              <div
                id="tooltip-copy"
                role="tooltip"
                className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Copy
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleMenu}
              data-dial-toggle="speed-dial-menu-hover"
              data-dial-trigger="hover"
              aria-controls="speed-dial-menu-hover"
              aria-expanded="false"
              className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 transition-transform group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span className="sr-only">Open actions menu</span>
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default NewMenu;
