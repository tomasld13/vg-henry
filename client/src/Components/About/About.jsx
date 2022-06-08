import React from 'react'
import { Nav } from '../Nav/Nav'
import { Footer } from "../Footer/Footer.jsx"
import git from "../props/github-icon-b.png"
import linkedIn from "../props/linkedin-icon-b.png"
import "./About.css"

export function About() {
  return (
    <div>
        <Nav></Nav>
        <div className="about-container">
          <h1>Proyecto Individual VideoGames</h1>
          <p>Está página es un proyecto que realicé para presentar el mismo en el bootcamp de Henry.<br/>
            El objetivo del este era construir una App utilizando React, Redux, Node y Sequelize; aprender mejores prácticas; familiarizarce con el workflow de GIT; y por ultimo, crear testing en la app haciendo uso de Jest.
            <br/>La API desde donde vienen los videojuegos es 
            <a href='https://rawg.io/apidocs'
            target="_blank" 
            rel='noopener noreferrer'> API RAWG.</a>
          </p>
          <p>
            Henry es una academia digital la cual brinda distintos bootcamps. En este caso cursé el bootcamp de Desarrollo Full Stack,
            en el que vi tanto el front como el back, con las tecnologias usadas para completar este proyecto.
          </p>
          <p>Mi nombre es Tomás Ledesma, soy Argentino, y estoy en camino a ser un Desarrollador Web Full Stack.<br/> 
          Me apasiona la tecnologia por lo que hace dos años decidí empezar a estudiar la Licenciatura en Sistemas. Pero hace unos meses dí una pausa en mi carrera para poder cursar este bootcamp, ya que lo ví como una muy buena oportunidad para aprender de forma intensiva y formarme como profesional.<br/>
          Hoy me encuentró en busqueda de mi primer empleo en el sector IT, muy motivado, con muchas ganas de seguir aprendiendo y con mucho entusiasmo de poder poner todos mis conocimientos en práctica.
          </p>
          <a href='https://www.soyhenry.com/webfullstack' 
          target="_blank" 
          rel='noopener noreferrer'>
            <img src="https://assets.soyhenry.com/henry-landing/assets/Henry/logo-white.png" alt="soyHenry-logo"></img>
          </a>
          <div className='about-links'>
          <a href='https://www.linkedin.com/in/ptomasledesma/' 
          target="_blank" 
          rel='noopener noreferrer'>
            <img src={linkedIn} className="icon-about" alt="linkedin-icon"></img>
          </a>
          <a href='https://www.github.com/tomasld13/PI-VideoGames-Henry' 
          target="_blank" 
          rel='noopener noreferrer'>
            <img src={git} className="icon-about" alt="github-icon"></img>
          </a>
          </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
