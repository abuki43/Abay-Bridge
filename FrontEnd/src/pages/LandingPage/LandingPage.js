import React from 'react'
import Navbar from '../../components/UIComponents/Navbar/Navbar'
import LandingHero from "../../components/UIComponents/LandingHero/LandingHero"

import './landingPage.css'

const LandingPage = () => {
  return (
    <div className='landingPage-container'>
        <Navbar/>
        <LandingHero/>
    </div>
  )
}

export default LandingPage