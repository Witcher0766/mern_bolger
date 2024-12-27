import React from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "../box/Box";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logout successfull");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <header className="d-flex flex-col  md:flex-row gap-y-5 px-28 ">
      <div >
        <Link
          to="/"
          className="font-extrabold font-serif text-4xl md:text-3xl lg:text-4xl"
        >
          Bol<span className="text-sky-400">ger</span>
        </Link>
        </div>
        <nav className="d-flex gap-x-5">
          {userInfo && (
            <>
              {/* <Link className={styles["link-btn"]} to="/create">Create</Link>
            <button className='btn-1' onClick={logout}>Logout</button>
            <p className="w-10 h-10 border-0 rounded-full flex items-center justify-center bg-gray-400" to="/create">{userInfo.username.charAt(0).toUpperCase()}</p> */}

              <div className="flex sm:flex-row md:flex-row items-center gap-2">
                <Link
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg text-center"
                  to="/create"
                >
                  Create
                </Link>
                <button
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
                <p className="w-10 h-10 text-white text-lg font-bold border-0 rounded-full flex items-center justify-center bg-gray-400">
                {userInfo?.username ? userInfo.username.charAt(0).toUpperCase() : 'U'}
                </p>
              </div>
            </>
          )}
          {!userInfo && (
            <>
              <Link className={styles["log-btn"]} to="/login">
                Login
              </Link>
              <Link className={styles["log-btn1"]} to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <Box />
    </>
  );
};

export default Header;
