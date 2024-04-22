import React from 'react'

import './landingHero.css'
import Button from '../../UIElements/Button/Button'

const LandingHero = () => {
  return (
    <div className='landingHero'>
      <h1>Cross the Bridge to Educational <br/>Enlightenment</h1>
      <h4>Building Connections, Bridging Knowledge Gaps</h4>
      <div className='buttons'>
        <Button color='black'padI='4.4'>Get started</Button>
        <Button color='transparent'padI='4.4' padB='0.54'>Guest mode</Button>
      </div>
    </div>
  )
}

export default LandingHero