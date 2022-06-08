import React from 'react';
import {useState} from "react"
import {useDispatch} from "react-redux"
import {clean, getSearchVideos} from "../../Redux/actions.js"
import joystick from "../props/wolf-icon-b.png"
import lupa from "../props/lupa-icon.png"
import "./Nav.css"
import { Link } from "react-router-dom";

export function Nav(){
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: ""
    })
    //Se almacena en el estado lo que el usuario haya escrito en la barra de busqueda
    function handleInputChange(e){
        setState({
            name: e.target.value
        })
    }
    //Se limpia la información que vino de la busqueda anterior con clean()
    //y se vuelve a hacer una solicitud nueva con getSearchVideos pasando como parametro lo que el usuario ingreso.
    function send(){
        dispatch(clean())
        dispatch(getSearchVideos(state.name))
    }
    return(
        <header className="navbar">
            <div>
               <Link to="/home"><p className="a"><img src={joystick} alt="joystick-icon" className="icon"/></p></Link> 
            </div>
            <Link to="/home"><h1> Henry Video Games</h1></Link>
            <div className="field">
                <input id="search" type="text" placeholder="Busca tu juego..." onChange={e => handleInputChange(e)}/>
                <Link to="/search"><button id="button-search" type="button" onClick={() => send()}><img src={lupa} alt="lupa-icon"/></button></Link>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <Link to="/home">Inicio</Link>
                        <Link to="/create">Crear</Link>
                        <Link to="/about">Proyecto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}