import React,{useState} from 'react'

import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import Button from '../../UIElements/Button/Button'
import BackDrop from '../../UIElements/BackDrop/BackDrop'

import './navbar.css'

const NavBar = () => {
  const [isSideBarOpen,setIsSideBarOpen] = useState(false)

  const openSideBar = ()=>{
    setIsSideBarOpen(true);
    console.log('clicked')
  }

  const closeSideBar = ()=>{
    setIsSideBarOpen(false);
  }
  return (
    <>
    <div className='navbar-container'>
      <header>
            <div className='nav-logo'>
                <img src=''/>
            </div>
            <div className='nav-menus mob-hide'>
                <ul className='nav-menus-lists'>
                    <li>Home</li>
                    <li>Question</li>
                    <li>Categories</li>
                </ul>
            </div>
            <div className='nav-buttons mob-hide'>
              <Button color='black'>Ask question</Button>
              <Button color='inverse'>Login</Button>
            </div>

            <div className='sidebar-opener desk-hide' onClick={openSideBar}>
              <GiHamburgerMenu/>
            </div>
        </header>
        <SideBar/>
    </div>
    {isSideBarOpen && (<><BackDrop onClick={closeSideBar}/><SideBar/></>)}
    </>
  )
}

const SideBar=()=>{
  <>
  <aside className='sideBar'>
    <Button>Ask question</Button>
    <div className='mobile-menus'>
      <ul className='mobile-menu-lists'>
        <li>Question</li>
        <li>Categories</li>
        <Button>Profile</Button>
      </ul>

      <Button>login/signup</Button>
    </div>
  </aside>
  </>
}

export default NavBar