import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Box = () => {
  const {userInfo} = useSelector((state) => state.auth); 


  let username = userInfo?.username;

  function checkfun() {
    toast.error("please login/register to create a post");
  }

  return (
    <>
    <div className="flex flex-col text-center md:text-left p-5 md:p-10 lg:px-28 mb-8 justify-center items-center md:items-start">
  <div className="flex flex-col justify-center gap-6 max-w-3xl">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
      Blog with <span className="text-sky-400">the best.</span>
    </h1>
    <p className="text-base md:text-lg lg:text-lg text-gray-600 w-full lg:max-w-none">
      More bloggers and independent creators choose WordPress than any other
      blogging tool. Tap into intuitive, flexible tools that put writers,
      bloggers, and creators first.
    </p>

    <div>
      {username ? (
        <Link to="/create" className="bg-sky-400 text-white px-6 py-2 rounded-md hover:bg-sky-500 transition duration-300">
          Start a Blog
        </Link>
      ) : (
        <Link
          onClick={checkfun}
          className="bg-sky-400 text-white px-6 py-2 rounded-md hover:bg-sky-500 transition duration-300"
        >
          Start a Blog
        </Link>
      )}
    </div>
  </div>
</div>
</>
  );
};

export default Box;
