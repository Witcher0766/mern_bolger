import "./App.css";
import Header from "./component/header/Header";
import {Container} from 'react-bootstrap'
import Footer from "./component/footer/Footer";
import { Outlet } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import { useState, useEffect } from "react";
import Preloader from "./component/Preloader";


      function App() {
        const [loading, setLoading] = useState(true);
        useEffect(() => {
          const handleLoad = () => {
            setTimeout(() => {
              setLoading(false);
            }, 3000); 
          };
          if (document.readyState === 'complete') {
            setLoading(false);
          } else {
            window.addEventListener('load', handleLoad);
          }
          return () => {
            window.removeEventListener('load', handleLoad);
          };
        }, []);

        return (
        <>
          {loading ? (
        <Preloader />
      ) : (
        <>
          <Header/>
          <main className='py-3'>
          <Container>
            <Outlet/>
          </Container>
          </main>
          <Footer/>
          <ToastContainer/>
</>
        )}
        </>
        );
      }

export default App;
