import heartFull from "../media/heart2.png";
import heartEmpty from "../media/emptyHeart.png";
import { useState } from "react";

const Heart = ({ state = false, txt, actions }) => {
  const [isActive, setIsActive] = useState(state);
  const handleHeart = () => {
    if (!isActive) {
      actions.like();
      setIsActive(!isActive);
    } else {
      actions.dislike();
      setIsActive(!isActive);
    }
  };
  return (
    <div className="absolute bottom-2 right-2">
      <button onClick={handleHeart} className="btn gap-2 font-bold">
        <img
          src={isActive ? heartFull : heartEmpty}
          alt=""
          className="w-[15px]"
        />
        {txt}
      </button>
    </div>
  );
};

export default Heart;
