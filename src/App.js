import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Header from "./component/Header/header";
import Shop from './component/Shop/shop'
import Cart from "./component/Cart/Cart";

function App() {


  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </BrowserRouter>
    </>
   
  );
}

export default App;