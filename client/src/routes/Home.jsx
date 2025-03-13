// import { Button } from "@/components/ui/button.jsx";
import React, {useEffect} from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

// import { toggleMenu } from "../slices/navMenuToggleSlice";
import { toggleMenu } from "../slices/navToggleSlice.js";
const Home = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.navToggleReducer);
  const { currentUser } = useSelector((state) => state.userReducer);



  // useEffect(() => {
  //   console.log("currentUser:", currentUser)

  // }, [currentUser]);

  return (
    <div
      className="mt-14"
      onClick={() => {
        dispatch(toggleMenu());
      }}
    >
    {/* <p>{currentUser?.emaial}</p> */}
      <blockquote
        className={`text-2xl font-semibold italic text-center`}
      >
        Are you looking for
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-hoverlighttext relative inline-block">
          <span className="relative text-white">Fabulous</span>
        </span>
        house?
        <span>Here will definitely satisfy you!</span>
      </blockquote>
      {/* https://v3.tailwindcss.com/docs/hover-focus-and-other-states */}
      {/* <Button>click me</Button> */}
    </div>
  );
};

export default Home;
