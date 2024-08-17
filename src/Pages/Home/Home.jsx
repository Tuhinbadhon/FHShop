/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import "./toggle.css";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import { AuthContext } from "../../provider/AuthProvider";
import LogRegComponent from "./LogRegComponent";
import AllProducts from "../../Components/AllProducts/AllProducts";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div>
      {!user ? (
        <LogRegComponent />
      ) : (
        <div>
          <h1 className="text-2xl mt-14 max-[450px]:mt-9 lg:text-5xl font-bold text-center ">
            Welcome to FH Collections
          </h1>
          <p className="text-lg lg:text-3xl font-bold text-center ">
            Your Fashion at Home
          </p>
          <AllProducts />
        </div>
      )}
    </div>
  );
};

export default Home;
