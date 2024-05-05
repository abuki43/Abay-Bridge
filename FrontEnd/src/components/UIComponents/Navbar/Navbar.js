import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu, GiArtificialHive } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoMdHome } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from "../../UIElements/Button/Button";
import BackDrop from "../../UIElements/BackDrop/BackDrop";
import { AuthContext } from "../../../utils/context-API";

import logo from "../../../assets/logo.svg";
import "./navbar.css";

const NavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const openSideBar = () => {
    setIsSideBarOpen(true);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <div className="navbar-container">
        <header>
          <div className="nav-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="nav-menus mob-hide">
            <ul className="nav-menus-lists">
              <Link to="/questions">Questions</Link>
              {isLoggedIn && <Link to="/ask">Ask AI</Link>}
              <Link to="/contact">Contact Us</Link>
            </ul>
          </div>
          <div className="nav-buttons mob-hide">
            {isLoggedIn ? (
              <>
                <Button color="black" padI="1.1">
                  Ask question
                </Button>
                <Button color="inverse">
                  <Link to="/profile">profile</Link>
                </Button>
              </>
            ) : (
              <Button color="black">
                <Link to="/login">login</Link>
              </Button>
            )}
          </div>
          <div className="hamburger desk-hide" onClick={openSideBar}>
            <GiHamburgerMenu />
          </div>
        </header>
      </div>
      <SideBar
        isOpen={isSideBarOpen}
        close={closeSideBar}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      {isSideBarOpen && (
        <>
          <BackDrop onClick={closeSideBar} />
        </>
      )}
    </>
  );
};

const SideBar = ({ isOpen, close, isLoggedIn, logout }) => {
  return (
    <>
      <aside className={`sideBar desk-hide ${isOpen ? "open" : ""}`}>
        <div className="mobile-menus">
          <button className="asideCloseBtn " onClick={close}>
            <IoMdCloseCircleOutline />
          </button>
          <ul className="mobile-menu-lists">
            <Link to="/questions">
              <IoMdHome />
              <p>Questions</p>
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/ask">
                  <GiArtificialHive />
                  <p>Ask AI</p>
                </Link>
                <Link to="/profile">
                  <CgProfile />
                  <p>Profile</p>
                </Link>
              </>
            )}
          </ul>
          <div className="aside-Buttons">
            {!isLoggedIn && (
              <Button color="inverse">
                <Link to="/login">Login/Signup</Link>
              </Button>
            )}
            {isLoggedIn && (
              <Button color="black">
                <Link to="/ask">Ask question</Link>
              </Button>
            )}
            {isLoggedIn && (
              <Button color="inverse" onClick={logout}>
                logout
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
