import "./App.css";

import { Route, Routes } from "react-router-dom";
// import IndexPage from "./pages/indexpage/IndexPage";
// import LoginPage from './pages/loginpage/LoginPage';
// import Register from './pages/loginpage/Register';
// import Create from './pages/create/Create';
// import Postpage from './pages/postpage/Postpage';
// import Editpost from './pages/editpost/Editpost';
import Layout from "./component/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {" "}
      </Route>
      {/* <Route index element={<IndexPage/>} /> */}
    </Routes>
  );
}
      // <Route path="/login" element={<LoginPage />} />
      // <Route path="/register" element={<Register />} />
      // <Route path="/create" element={<Create />} />
      // <Route path="/post/:id" element={<Postpage />} />
      // <Route path="/edit/:id" element={<Editpost />} />

export default App;
