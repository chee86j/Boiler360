import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store/auth";
import { Link, Routes, Route } from "react-router-dom";
import { fetchCart } from "../store/cart";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <div>
      <h1>Boiler360</h1>
      {auth.id ? <Home /> : <Login />}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
