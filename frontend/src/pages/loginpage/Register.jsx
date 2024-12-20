import React, { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import Card from "../../component/card/Card";
import { Link } from "react-router-dom";
import registerImg from "../../assets/register.gif";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import Loader from "../../component/Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const registerHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect || '/');
        toast.success("Registration Successfull");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={registerHandler}>
            <input
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                <input
              type="password"
              placeholder="Confim Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="btn">Register</button>
          {isLoading  && <Loader/>}
          </form>
          <span className={styles.register}>
            <p>Already have an account? </p>
            <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width="300" />
      </div>
    </section>
  );
};

export default Register;
