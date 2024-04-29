import React, { useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../../UIElements/Button/Button";
import BackDrop from "../../UIElements/BackDrop/BackDrop";

import logo from "../../../assets/logo.svg";
import "./navbar.css";

const NavBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const openSideBar = () => {
    setIsSideBarOpen(true);
    console.log("clicked");
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
              <li>Home</li>
              <li>Question</li>
              <li>Categories</li>
            </ul>
          </div>
          <div className="nav-buttons mob-hide">
            <Button color="black">Ask question</Button>
            <Button color="inverse">Login</Button>
          </div>

          <div className="hamburger desk-hide" onClick={openSideBar}>
            <GiHamburgerMenu />
          </div>
        </header>
      </div>
      <SideBar isOpen={isSideBarOpen} close={closeSideBar} />
      {isSideBarOpen && (
        <>
          <BackDrop onClick={closeSideBar} />
        </>
      )}
    </>
  );
};

const SideBar = ({ isOpen, close }) => {
  return (
    <>
      <aside className={`sideBar desk-hide ${isOpen ? "open" : ""}`}>
        <div className="mobile-menus">
          <button className="asideCloseBtn " onClick={close}>
            <IoMdCloseCircleOutline />
          </button>
          <ul className="mobile-menu-lists">
            <li>Question</li>
            <li>Categories</li>
            <li>Profile</li>
          </ul>
          <div className="aside-Buttons">
            <Button>login/signup</Button>
            <Button color="black">Ask question</Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
