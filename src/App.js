import './App.css';
import React, { useState } from 'react';
import User from './getuser/user';
import Adduser from './adduser/Adduser';
import Update from "./updateuser/Update";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from './Login/login';
import Home from './Home/home';
import Admin from './admin/admin';
import AddProduct from './admin/addproduct';
import Producttable from './admin/producttable';
import View_products from './admin/producttable';
import Updateproduct from './admin/update';
import Contact from './Home/contact';
import About from './Home/about';
import Wallet from './Home/wallet';
import Payment from './Home/payment';


export const Context = React.createContext();
const router = createBrowserRouter([// Creates a router object to define app routes.
 {
 path: "/user",
 element: <User />,
 },
 {
  path:"/add-product",
  element:<AddProduct />
 },
 {
  path:"/",
  element:<LoginPage />
 },
 {
    path:"/signup",
    element:<Adduser />
  },
  {
    path:"/update/:id",
    element:<Update />
  },{
    path:"/home",
    element:<Home />
  },
  {
    path:"/update/product/:id",
    element:<Updateproduct />
  },{
    path:"/admin",
    element:<Admin />
  },{
    path:"/producttable",
    element:<Producttable />
  },
  {
    path: "/add_products",
    element: <AddProduct />,
    },
  {
    path: "/all_products",
    element: <View_products />,
    },{
      path:"/contact",
      element:<Contact />
    },{
      path:"/about",
      element:<About />
    },
    {
      path:"/wallet",
      element:<Wallet />
    },{
      path:"/payment",
      element:<Payment />
    }
  
]);
function App() {

  const [user, setuser ] = useState("");
  const [page, setPage] = useState("/"); 
  const [cart, setCart] = useState([]);
  return (
  <div className="App">
  <header className="App-header">
    <Context.Provider value={{ user, setuser, setPage, cart, setCart }}>
        <RouterProvider router={router}/>   
        </Context.Provider> 
  </header>
  </div>
  );
  }
  export default App;
  