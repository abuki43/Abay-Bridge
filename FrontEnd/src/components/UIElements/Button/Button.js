import React from 'react'
import {Link} from 'react-router-dom'
import './button.css'

const Button = (props) => {
    const padStyle = {
        padding: `${props.padB ? props.padB + "rem" : "0.6rem"} ${props.padI}rem`,
        height: '35px'
    };


  if(props.to){
    return(
        <Link>
            {props.children}
        </Link>
    )
  }
    return(
        <button className={`button button-${props.color}`} style={padStyle}>
            {props.children}
        </button>
    )
  
}

export default Button