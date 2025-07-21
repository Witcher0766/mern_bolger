import "./App.css";
import Header from "./component/header/Header";
import { Container } from "react-bootstrap";
import Footer from "./component/footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
