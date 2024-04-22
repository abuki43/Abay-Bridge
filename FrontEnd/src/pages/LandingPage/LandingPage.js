import React from 'react'
import Navbar from '../../components/UIComponents/Navbar/Navbar'
import LandingHero from "../../components/UIComponents/LandingHero/LandingHero"
import LandingWhy from '../../components/UIComponents/LandingWhy/LandingWhy'
import Footer from '../../components/UIComponents/Footer/Footer'
import './landingPage.css'

const LandingPage = () => {
  return (
    <div className='landingPage-container'>
        <Navbar/>
        <LandingHero/>
        <LandingWhy/>
        <Footer/>
    </div>
  )
}

export default LandingPage