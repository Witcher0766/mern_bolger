import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import Postpage from "./pages/postpage/Postpage";
import { Provider } from "react-redux";
import store from "./store";
import LoginPage from "./pages/loginpage/LoginPage";
import Register from "./pages/loginpage/Register";
import Create from "./pages/create/Create";
import Editpost from "./pages/editpost/Editpost";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import IndexPage from "./pages/indexpage/IndexPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<IndexPage />} />
      <Route path="/post/:id" element={<Postpage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Editpost />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
