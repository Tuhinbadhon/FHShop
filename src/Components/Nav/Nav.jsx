/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import "./loader.css";
import Swal from "sweetalert2";

import { AuthContext } from "../../provider/AuthProvider";

defineElement(lottie.loadAnimation);

const Nav = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       setUser(user);
  //     });
  //     return () => unsubscribe();
  //   }, []);

  const navlink = (
    <>
      <li>
        <Link to="/" onClick={() => setIsDropdownOpen(false)}>
          Home
        </Link>
      </li>
      {user ? (
        <>
          <li>
            <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
              View Profile
            </Link>
          </li>
        </>
      ) : (
        <></>
        // <li>
        //   <Link to="/registration" onClick={() => setIsDropdownOpen(false)}>
        //     Registration
        //   </Link>
        // </li>
      )}
    </>
  );

  const photoIcon = (
    <>
      <div className="w-10 rounded-full">
        <lord-icon
          className="w-full h-full"
          src="https://cdn.lordicon.com/kthelypq.json"
          trigger="loop"
          delay="500"
          colors="primary:#000"
          style={{ width: "40px", height: "40px" }}
        ></lord-icon>
      </div>
    </>
  );

  const logOutHandler = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          text: "Successfully logout",
          icon: "success",
        });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (loading) {
    <div className="loading-wave">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
    </div>;
  }

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost p-0 lg:hidden"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52 font-semibold text-black"
              >
                {navlink}
              </ul>
            )}
          </div>
          <div className="flex flex-row w-auto">
            <Link to="/">
              {" "}
              <img
                className="lg:w-12 lg:h-12 w-10 max-[450px]:hidden"
                src="/srlogo.png"
                alt=""
              />{" "}
            </Link>
            <Link
              to="/"
              className="btn btn-ghost lg:text-lg font-bold max-[450px]:text-2xl text-black  p-0"
            >
              FH <span className="text-blue-800 font-bold">Collections</span>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold  text-black">
            {navlink}
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          {user ? (
            <>
              <div
                className="btn btn-ghost tooltip tooltip-bottom btn-circle avatar"
                onMouseEnter={() => setShowUserDetails(true)}
                onMouseLeave={() => setShowUserDetails(false)}
                data-tip={user.displayName}
              >
                {user.photoURL ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  photoIcon
                )}
              </div>
              <button className="btn btn-neutral" onClick={logOutHandler}>
                Log Out{" "}
              </button>
            </>
          ) : (
            <>
              <div className="btn btn-ghost btn-circle avatar">{photoIcon}</div>
              <Link to="/login">
                <button className="btn btn-neutral">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
