import React, { useContext, useEffect } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '../box/Box';

const Header = () => {
  // const {setUserInfo, userInfo} = useContext(UserContext);
  // let navigate = useNavigate();


  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_SERVER_URL}profile`, {
  //     credentials: 'include',
  //   }).then((response) => {
  //     response.json().then(userInfo => {
  //       setUserInfo(userInfo);
  //     })
  //   })
  // }, []);

  // function logout() {
  //   fetch(`${process.env.REACT_APP_SERVER_URL}logout`, {
  //     credentials: 'include',
  //     method: 'POST',
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       setUserInfo(null);
  //       navigate('/login');
  //       toast.success("Logout successful");
  //     } else {
  //       toast.error("logout failed");
  //     }
  //   })
  //   .catch(error => {
  //     toast.error('Fetch error during logout:');
  //   });
  //   localStorage.clear();
  // }

  //   let username = userInfo?.username;
  //   let firstLetter = username ? username.charAt(0).toUpperCase() : '';

  function logout() {

  }
  const username = ""


  return (
    <>
        <header className='d-flex justify-between px-28'>
        <Link to="/" className='font-extrabold font-serif text-2xl md:text-3xl lg:text-4xl' >Bol<span className='text-sky-400'>ger</span></Link>
        <nav>
        {username && (
          <>
            {/* <Link className={styles["link-btn"]} to="/create">Create</Link> */}
            {/* <button className='btn-1' onClick={logout}>Logout</button> */}
            <p className='w-1/2 h-1/2 border-' to="/create">F</p>
          </>
        )}
        {!username && (
          <>
          <Link className={styles["log-btn"]} to="/login">Login</Link>
          {/* <Link className={styles["log-btn1"]} to="/register">Register</Link> */}
          </>
        )}
        </nav>
      </header>
    <Box/>
    </>
  )
}

export default Header;