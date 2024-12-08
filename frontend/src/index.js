import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import Postpage from './pages/postpage/Postpage';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import IndexPage from './pages/indexpage/IndexPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<IndexPage/>}/>
    <Route path="/post/:id" element={<Postpage />} />
 

    {/* // <Route path="/login" element={<LoginPage />} /> */}
      {/* // <Route path="/register" element={<Register />} /> */}
      {/* // <Route path="/create" element={<Create />} /> */}
      {/* // <Route path="/edit/:id" element={<Editpost />} /> */}
  
    </Route>
  )
)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
 </React.StrictMode>
);


