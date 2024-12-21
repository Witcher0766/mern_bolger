import React, { useState, useEffect } from 'react'
import styles from './LoginPage.module.css'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import Card from '../../component/card/Card'
import loginImg from "../../assets/login.gif";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../component/Loader';
import { useLoginMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading} ] = useLoginMutation();

  const {userInfo} = useSelector((state) => state.auth);

  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() =>{
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    const res = await login({email, password}).unwrap();
    dispatch(setCredentials({...res}));
    navigate(redirect);
    toast.success("Login Successfull")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <section className={styles.auth}>
    <div className={styles.img}>
      <img src={loginImg} alt="Login" width="300" />
    </div>
    <Card>
      <div className={styles.form}>
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn" disabled={isLoading}>
            Login
          </button>
          {isLoading  && <Loader/>}
          {/* <div className={styles.links}>
            <Link to="/reset">Reset Password</Link>
          </div> */}
        </form>
      <div className={styles["accordion"]}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Demo Login (Username, Password)
        </AccordionSummary>
        <AccordionDetails>
        <p>Username: luffy@gmail.com</p>
        <p>Password: luffy123</p>
        </AccordionDetails>
      </Accordion>
    </div>
        <span className={styles.register}>
          <p>Don't have an account? </p>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </span>
      </div>
    </Card>
  </section>
  )
}

export default LoginPage