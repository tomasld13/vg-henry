import React from 'react'
import {Link} from "react-router-dom"
import "./Footer.css"

export function Footer() {
  return (
    <div className="footer">
        <h3>Creado por <Link to="/about">Tomás Ledesma </Link> 
          <img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" 
          alt="henry-logo">
          </img>
        </h3>
    </div>
  )
}
